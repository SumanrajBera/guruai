import nodemailer from 'nodemailer'
import { config } from '../config/config.js'
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    connectionTimeout: 30000,
    auth: {
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_APP_PASSWORD
    }
})

try {
    await transporter.verify()
    console.log("Email service is working")
} catch (error) {
    console.error(error)
}

export default transporter;