import nodemailer from 'nodemailer'
import { config } from '../config/config.js'
import dns from "node:dns";

dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
    console.log(addresses);
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_APP_PASSWORD
    },
    dnsLookup(hostname, options, callback) {
        dns.lookup(hostname, { ...options, family: 4 }, callback);
    }
})

try {
    await transporter.verify()
    console.log("Email service is working")
} catch (error) {
    console.log("Error", error)
}

export default transporter;