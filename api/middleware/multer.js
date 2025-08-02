import multer from "multer";
import path from "path";
import fs from "fs";

// Root upload directory
const rootUploadDir = "uploads";

// Ensure root folder exists
if (!fs.existsSync(rootUploadDir)) {
  fs.mkdirSync(rootUploadDir);
}

// Multer disk storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rootUploadDir);
  },

  filename: function (req, file, cb) {
    // Use timestamp + original extension to avoid collisions
    const uniqueSuffix = Date.now() + path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype.toLowerCase());

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp, gif)"));
  }
};

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max size (adjust if needed)
  fileFilter,
});

export default upload;
