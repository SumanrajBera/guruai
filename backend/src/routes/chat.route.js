import { Router } from 'express'
import { verifyUser } from '../middleware/auth.middleware.js';
import { chatHistoryController, conversationController, conversationHistoryController, retryConversationController } from '../controllers/chat.controller.js';

const router = Router()

/**
 * @description For conversation history
 */

router.get("/conversationHistory", verifyUser, conversationHistoryController)

/**
 * @description For conversation
 */
router.post("/conversation", verifyUser, conversationController)

/**
 * @description For conversation retry
 */
router.post("/retry", verifyUser, retryConversationController)

/**
 * @description For chat history
 */
router.get("/chatHistory", verifyUser, chatHistoryController)

export default router;