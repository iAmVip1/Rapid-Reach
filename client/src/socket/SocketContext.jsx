import { io } from "socket.io-client";

let socket;

const getSocket = () => {
    if (!socket) {
        const url = import.meta.env.VITE_API_SOCKET_URL || "http://localhost:3000";
        socket = io(url, {
            withCredentials: true,
            transports: ["websocket", "polling"],
        });
    }
    return socket;
}

const setSocket = () => {
    socket = null;
}

export default {
    getSocket, setSocket
}