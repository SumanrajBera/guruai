import { config } from "../config/config.js";
import transporter from "../service/mail.service.js";
import jwt from 'jsonwebtoken'

async function sendEmail(user) {
    const email = user.email;

    const emailToken = jwt.sign({
        email
    }, config.JWT_SECRET)

    const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${emailToken}`

    const mail = await transporter.sendMail({
        from: config.GOOGLE_USER,
        to: email,
        subject: "Welcome to GuruAI | Verify Your Email",
        html: getVerificationEmailTemplate(user.username, verificationLink)
    })
}

function getVerificationEmailTemplate(name, verificationLink) {
    return `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding:40px 0;">
                        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background:#4F46E5;padding:32px;text-align:center;">
                                    <h1 style="color:#ffffff;margin:0;font-size:24px;">GuruAI</h1>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 32px;">
                                    <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">
                                        Welcome, ${name}!
                                    </h2>
                                    <p style="margin:0 0 24px;color:#6B7280;font-size:15px;line-height:1.6;">
                                        Thanks for signing up. Please verify your email address by clicking the button below.
                                    </p>

                                    <!-- Button -->
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="background:#4F46E5;border-radius:6px;">
                                                <a href="${verificationLink}" 
                                                   style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;">
                                                    Verify Email Address
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="margin:24px 0 0;color:#9CA3AF;font-size:13px;">
                                        If you didn't create an account, you can safely ignore this email.
                                    </p>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background:#F9FAFB;padding:24px 32px;text-align:center;">
                                    <p style="margin:0;color:#9CA3AF;font-size:12px;">
                                        © 2025 GuruAI. All rights reserved.
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `
}

export default sendEmail;