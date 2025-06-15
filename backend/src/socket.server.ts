import { Server as HTTPServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import config from "./config";

let io: SocketIOServer;

const userSocketMap: Record<string, string> = {};
export const configureSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: config.FRONTEND_URL,
      credentials: true,
    },
  });
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;
    console.log("🔌 Socket connected:", userId);
    userSocketMap[userId] = socket.id;

     socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      console.log("❌ Socket disconnected:", userId);
    });
    console.log(userSocketMap);
  });
};
