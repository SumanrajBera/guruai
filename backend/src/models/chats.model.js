import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CONVO",
        required: true
    },
    role: {
        type: String,
        enum: ["human", "ai"],
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

chatSchema.index({ conversationId: 1, createdAt: -1 })

const chatModel = mongoose.model("CHAT", chatSchema);

export default chatModel;