import { Router } from 'express'
import { verifyUser } from '../middleware/auth.middleware.js';
import { generateResponse, generateRetryResponse, generateTitle } from '../service/ai.service.js';
import convModel from '../models/conversations.model.js';
import chatModel from '../models/chats.model.js';

const router = Router()

/**
 * @description For conversation history
 */

router.get("/conversationHistory", verifyUser, async (req, res) => {
    try {
        const id = req.id;
        const lt = req.query.lt ? new Date(req.query.lt) : new Date()
        const conversations = await convModel.find({ user: id, updatedAt: { $lt: lt } }).sort({ updatedAt: -1 }).limit(10);

        return res.status(200).json({
            message: "Fetched all conversation",
            conversations
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

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

        if (conversation.user.toString() !== req.id) return res.status(403).json({
            message: "Unauthorized access to this conversation"
        })

        const humanChat = await chatModel.create({ conversationId: conversation._id, role: "human", content: message })
        conversation.updatedAt = Date.now()
        await conversation.save()

        let response, aiChat;
        try {
            response = await generateResponse(conversation._id, message)
            aiChat = await chatModel.create({ conversationId: conversation._id, role: "ai", content: response });
        } catch (err) {
            return res.status(200).json({
                convId: conversation._id,
                title: conversation.title,
                updatedAt: conversation.updatedAt,
                chats: [humanChat],
                error: "AI failed to respond. Please retry."
            })
        }

        return res.status(200).json({
            message: "Your response is ready",
            convId: conversation._id,
            title: conversation.title,
            updatedAt: conversation.updatedAt,
            chats: [
                humanChat, aiChat
            ]
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

/**
 * @description For chat history
 */
router.get("/chatHistory", verifyUser, async (req, res) => {
    try {
        const { convId, lt: ltQuery } = req.query

        if (!convId) return res.status(400).json({ message: "convId is required" })

        const lt = ltQuery ? new Date(ltQuery) : new Date()

        const conversation = await convModel.findById(convId)

        if (!conversation) return res.status(404).json({ message: "Conversation not found" })

        if (conversation.user.toString() !== req.id) return res.status(403).json({ message: "Unauthorized" })

        const chats = await chatModel
            .find({ conversationId: convId, createdAt: { $lt: lt } })
            .sort({ createdAt: -1 })
            .limit(20)

        chats.reverse()

        return res.status(200).json({
            message: "Fetched all chats",
            chats
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

export default router;