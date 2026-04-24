import { Router } from "express";
import userModel from "../models/auth.model";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const router = Router();

function sendToken(user, status, message, res) {
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, config.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token)

    return res.status(status).json({
        message
    })
}

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        const exists = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        })

        if (exists) return res.status(400).json({
            message: "User with such email or username already exists"
        })

        const user = await userModel.create({ username, email, password })

        sendToken(user, 201, "User registered successfully", res)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.post("/login", async (req, res) => {
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
})

export default router;