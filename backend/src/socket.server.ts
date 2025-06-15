import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import config from './config'

let io: SocketIOServer


const userSocketMap: Record<string, string> = {}
export const configureSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: config.FRONTEND_URL,
      credentials: true
    }
  })
  io.on('connection', (socket: Socket) => {
  const userId = socket.handshake.query.userId as string
    console.log('🔌 Socket connected:', userId)

  userSocketMap[userId] = socket.id

    socket.on('disconnect', () => {
      delete userSocketMap[userId]
      console.log('❌ Socket disconnected:', userId)
    })
  console.log(userSocketMap)
  })
}

export const getIO = () => io
