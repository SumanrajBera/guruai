import express from 'express'
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRouter from './routes/auth.route.js'
import chatRouter from './routes/chat.route.js'
import rateLimit from 'express-rate-limit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Limiter Code
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per 15 minutes
    message: { message: "Too many requests, please try again later." }
})

const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // max 20 AI requests per hour
    message: { message: "AI request limit reached, please try again later." }
})

const app = express()
app.set('trust proxy', 1)
app.use(limiter)  // global limiter
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "DELETE"],
//     credentials: true
// }))

app.use("/api/chat", aiLimiter)  
/**
 * @description All routes
 */
app.use("/api/auth", authRouter)
app.use("/api/chat", chatRouter)

/**
 * @description Serve frontend
 */
app.use(express.static(path.join(__dirname, '../public')))

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

export default app;