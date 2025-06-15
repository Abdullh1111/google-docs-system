import { Server as HTTPServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import config from "./config";

let io: SocketIOServer;

const userSocketMap: Record<string, string> = {};
const activeRoomUsers: Record<
  string,
  Record<string, { email: string; avatar: string }>
> = {};

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

    // Room
    socket.on("join-room", ({ roomId, email, avatar }) => {
      socket.join(roomId);

      activeRoomUsers[roomId] = activeRoomUsers[roomId] || {};
      activeRoomUsers[roomId][userId] = { email, avatar };



    console.log("🧭 Current activeRoomUsers:", activeRoomUsers[roomId]);
      io.to(roomId).emit("user-joined", Object.values(activeRoomUsers[roomId]));
    });


    socket.on("leave-room", ({ roomId }) => {
      if (!roomId) return;

    console.log("🧭 Current activeRoomUsers:", activeRoomUsers[roomId]);
      socket.leave(roomId);

      const room = activeRoomUsers[roomId];
      if (room && room[userId]) {
        delete room[userId];
        console.log(`🚪 Socket ${socket.id} left room ${roomId}`);
      }

      if (activeRoomUsers[roomId]) {
        const updatedUsers = Object.values(activeRoomUsers[roomId]);
        io.to(roomId).emit("user-joined", updatedUsers);
      }
    });

    // room

    socket.on("edit-document", ({ roomId, content }) => {
      console.log("📝 Document edited:", roomId, content);
      socket.to(roomId).emit("receive-document", { content });
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];

      console.log("❌ Socket disconnected:", userId);
    });

    console.log("🧭 Current userSocketMap:", userSocketMap);
  });
};
