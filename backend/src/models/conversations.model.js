import mongoose from "mongoose";

const convSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "New Conversation",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",

    }
}, { timestamps: true })

const convModel = mongoose.model("CONVO", convSchema);

export default convModel;