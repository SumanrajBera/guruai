import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";
import { HumanMessage, SystemMessage, AIMessage } from 'langchain'
import chatModel from "../models/chats.model.js";

export const geminiModel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: config.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    apiKey: config.MISTRAL_API_KEY
});

async function fetchHistory(conversationId) {
    const history = await chatModel.find({ conversationId })
        .sort({ createdAt: -1 })
        .limit(20)
        .select("role content")

    return history.reverse()
}

export const generateTitle = async function (message) {
    const response = await mistralModel.invoke([
        new SystemMessage("Generate a short 4-6 word title for this conversation based on the user's message. Return only the title, nothing else. No quotes, no punctuation."),
        new HumanMessage(message)
    ])
    return response.content
}

export const generateResponse = async function (conversationId, message) {
    const history = await fetchHistory(conversationId)

    const response = await geminiModel.invoke([
        new SystemMessage("You are GuruAI, a helpful and knowledgeable assistant. If you don't something about this just say that your model wasn't upto date for this question."),
        ...history.map(msg =>
            msg.role === "human"
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        ),
        new HumanMessage(message)
    ])
    return response.content;
}

export const generateRetryResponse = async function (conversationId) {
    const history = await fetchHistory(conversationId)

    const response = await geminiModel.invoke([
        new SystemMessage("You are GuruAI, a helpful and knowledgeable assistant. If you don't something about this just say that your model wasn't upto date for this question."),
        ...history.map(msg =>
            msg.role === "human"
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        )
    ])
    return response.content;
}