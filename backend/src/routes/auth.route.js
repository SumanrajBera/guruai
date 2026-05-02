import { Router } from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import { getMeController, loginController, logoutController, registerController, resendEmailController, verifyEmailController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController)

router.post("/login", loginController)

router.get("/verify-email", verifyEmailController)

router.post("/resend", resendEmailController)

router.get("/getMe", verifyUser, getMeController)

router.post("/logout", logoutController)

export default router;