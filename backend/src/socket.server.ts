import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import config from './config'

let io: SocketIOServer

export const configureSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: config.FRONTEND_URL,
      credentials: true
    }
  })
  io.on('connection', (socket: Socket) => {
    console.log('🔌 Socket connected:', socket.id)

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected:', socket.id)
    })
  })
}

export const getIO = () => io
