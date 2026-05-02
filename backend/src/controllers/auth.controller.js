import userModel from "../models/auth.model.js"
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

function sendToken(user, status, message, res) {
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, config.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(status).json({
        message
    })
}

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const exists = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        })

        if (exists) {
            return res.status(400).json({
                message: `User with such email or username already exists.`,
                isVerified: exists.isVerified
            })
        }

        const user = await userModel.create({ username, email, password })

        await sendEmail(user)

        return res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { identifier, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username: identifier }, { email: identifier }
            ]
        }).select("+password")

        if (!user) return res.status(400).json({
            message: "Invalid Credentials"
        })

        if (!user.isVerified) return res.status(409).json({
            message: "Please verify your email",
            isVerified: false
        })

        const isCorrect = await user.comparePassword(password);

        if (!isCorrect) return res.status(400).json({
            message: "Invalid Credentials"
        })

        sendToken(user, 200, "Login successfully", res)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) return res.status(400).json({
            message: "Email can't be verified."
        })

        const { email } = jwt.verify(token, config.JWT_SECRET)

        const user = await userModel.findOne({ email });

        if (!user) return res.status(400).json({
            message: "Please register! As such user doesn't exist"
        })

        /**
         * @change When Frontend works change this
         */
        if (user.isVerified) return res.status(400).json({
            message: "Email already verified"
        })

        user.isVerified = true
        await user.save()

        /**
         * @change When Frontend works change this
         */
        return res.status(200).json({
            message: "Email verified"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const resendEmailController = async (req, res) => {
    try {
        const { identifier } = req.body;

        const exists = await userModel.findOne({
            $or: [
                { username: identifier }, { email: identifier }
            ]
        })

        if (!exists) return res.status(400).json({
            message: "Invalid request. Please register!"
        })

        if (exists.isVerified) return res.status(400).json({
            message: "Email is already verified. Please login!",
            isVerified: true
        })

        await sendEmail(exists)

        return res.status(200).json({
            message: "Email sent successfully."
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getMeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.id)

        if (!user) return res.status(400).json({
            message: "Please Login!"
        })

        return res.status(200).json({
            username: user.username
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logoutController = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
    })

    return res.status(200).json({
        message: "Logged out"
    })
}