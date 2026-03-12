import { Router } from "express";
import { registerValidator } from "../validators/auth.validators.js";
import { registerController, verfiyEmailController } from "../controllers/auth.conrollers.js";

export const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, registerController);

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authRouter.get('/verify-email', verfiyEmailController)