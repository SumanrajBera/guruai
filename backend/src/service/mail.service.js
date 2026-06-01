import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    socket: {
        family: 4
    }
})

try {
    await transporter.verify()
    console.log("Email service is working")
} catch (error) {
    console.log("Error", error)
}

export default transporter;