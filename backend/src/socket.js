import { Server as SocketIOServer } from "socket.io";
import ApiError from "./utils/ApiError.js";

const setupSocketServer = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    },
    pingTimeout: 60000,
  });

  const userSocketMap = new Map();

  const disconnectUser = (socket) => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (!userId) throw new ApiError(404, "user id is not found");

    userSocketMap.set(userId, socket.id);
    console.log(`User Connected: ${userId} with socket id: ${socket.id}`);

    socket.on("disconnect", disconnectUser(socket));
  });
};

export default setupSocketServer;
