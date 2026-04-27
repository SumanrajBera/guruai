import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import chatRouter from './routes/chat.route.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))

/**
 * @description All routes
 */
app.use("/api/auth", authRouter)
app.use("/api/chat", chatRouter)

export default app;