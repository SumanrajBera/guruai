import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // APP PASSWORD METHOD
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_APP_PASSWORD
    }
})

try {
    await transporter.verify()
    console.log("Email service is working")
} catch (error) {
    console.log("Error", error)
}

export default transporter;