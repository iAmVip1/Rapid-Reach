import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import path from "path";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("✅ Database Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Allowed frontend origins (no cors package needed)
const allowedOrigins = [
  "http://localhost:5173", // frontend dev
  "https://your-production-domain.com", // production frontend
];

// Initialize Socket.IO with built-in CORS
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
console.log("Success Socket.io Initialized with CORS");

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("join", (user) => {
    if (!user || !user.id) {
      console.warn("[WARNING] Invalid user data on join");
      return;
    }
    socket.join(user.id);
    const existingUser = onlineUsers.find((u) => u.userId === user.id);
    if (existingUser) {
      existingUser.socketId = socket.id;
    } else {
      onlineUsers.push({
        userId: user.id,
        name: user.name,
        socketId: socket.id,
      });
    }
    io.emit("online-users", onlineUsers);
  });

  socket.on("callToUser", (data) => {
    try {
      const call = onlineUsers.find((user) => user.userId === data.callToUserId);
      if (!call) {
        socket.emit("userUnavailable", { message: `${data.name} is offline` });
        return;
      }
      io.to(call.socketId).emit("callToUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
        email: data.email,
        profilepic: data.profilepic,
      });
    } catch (error) {
      console.error("Error in callToUser:", error);
      socket.emit("error", { message: "An error occurred with the call request." });
    }
  });

  socket.on("answeredCall", (data) => {
    io.to(data.to).emit("callAccepted", {
      signal: data.signal,
      from: data.from,
    });
  });

  socket.on("call-ended", (data) => {
    io.to(data.to).emit("callEnded", {
      name: data.name,
    });
  });

  socket.on("reject-call", (data) => {
    io.to(data.to).emit("callRejected", {
      name: data.name,
      profilepic: data.profilepic,
    });
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
    io.emit("online-users", onlineUsers);
    socket.broadcast.emit("DisconnectUser", { disUser: socket.id });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!!`);
});
