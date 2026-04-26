import { Router } from 'express'
import { verifyUser } from '../middleware/auth.middleware.js';
import { generateResponse, generateRetryResponse, generateTitle } from '../service/ai.service.js';
import convModel from '../models/conversations.model.js';
import chatModel from '../models/chats.model.js';

const router = Router()

/**
 * @description For conversation
 */
router.post("/conversation", verifyUser, async (req, res) => {
    try {
        const { convId = null, message } = req.body;
        let conversation = null;
        if (!message) return res.status(400).json({
            message: "Please provide some input"
        })

        if (!convId) {
            const title = await generateTitle(message)
            conversation = await convModel.create({ title, user: req.id })
        } else {
            conversation = await convModel.findById(convId)
        }

        if (!conversation) return res.status(409).json({
            message: "Conversation was either deleted or doesn't exist."
        })

        await chatModel.create({ conversationId: conversation._id, role: "human", content: message })

        const response = await generateResponse(conversation._id, message)

        await chatModel.create({ conversationId: conversation._id, role: "ai", content: response })

        conversation.updatedAt = Date.now()
        await conversation.save()

        return res.status(200).json({
            message: "Your response is ready",
            title: conversation.title,
            response
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error."
        })
    }
})

/**
 * @description For conversation retry
 */
router.post("/retry", verifyUser, async (req, res) => {
    try {
        const { convId } = req.body;

        if (!convId) return res.status(409).json({
            message: "Sorry this request can't be made"
        })

        let conversation = await convModel.findById(convId)

        if (!conversation) return res.status(409).json({
            message: "Conversation was either deleted or doesn't exist."
        })

        await chatModel.findOneAndDelete({ conversationId: convId, role: "ai" }).sort({ createdAt: -1 })

        const response = await generateRetryResponse(conversation._id)

        await chatModel.create({ conversationId: conversation._id, role: "ai", content: response })

        conversation.updatedAt = Date.now()
        await conversation.save()

        return res.status(200).json({
            message: "Your response is ready",
            response
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error."
        })
    }
})

export default router;