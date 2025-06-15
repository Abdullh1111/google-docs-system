import http from 'http'
import app from './app'
import config from './config'
import { connectDB } from './config/db'
import { configureSocket } from './socket.server'

const port = config.PORT

const server = http.createServer(app) 

configureSocket(server)

server.listen(port, async () => {
  await connectDB()
  console.log(`🚀 Server running on port ${port}`)
})
