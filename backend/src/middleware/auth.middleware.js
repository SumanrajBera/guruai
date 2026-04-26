import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';

export const verifyUser = function (req, res, next) {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({
            message: "Please login!"
        })
        const { id } = jwt.verify(token, config.JWT_SECRET);
        req.id = id
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Please login! Your token is invalid"
        })
    }
}