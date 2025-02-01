import { Server as SocketIOServer } from "socket.io";

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
    console.log("User connected and socket id is ", socket.id);

    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("Connected");
    });
  });
};

export default setupSocketServer;
