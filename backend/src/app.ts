import express, { Request, Response } from 'express'
import cors from 'cors'
import config from './config'

const app = express()

app.use(express.json())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true}))
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! from backend')
})


export default app
