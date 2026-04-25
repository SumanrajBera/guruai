import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAUTH2",
        user: config.GOOGLE_USER,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN
    }
})

try {
    await transporter.verify()
    console.log("Email service is working")
} catch (error) {
    console.log("Error", error)
}

export default transporter;