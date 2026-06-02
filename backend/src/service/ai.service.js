import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { TavilySearch } from "@langchain/tavily";
import { config } from "../config/config.js";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
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

const tavilyTool = new TavilySearch({
    maxResults: 5,
    tavilyApiKey: config.TAVILY_API_KEY,
});

const geminiWithTools = geminiModel.bindTools([tavilyTool]);

async function fetchHistory(conversationId) {
    const history = await chatModel.find({ conversationId })
        .sort({ createdAt: -1 })
        .limit(20)
        .select("role content")
    return history.reverse()
}

function normalizeContent(content) {
    if (typeof content === "string") return content;
    return content.map(b => b.text ?? "").join("");
}

async function invokeWithTools(messages) {
    try {
        const response = await geminiWithTools.invoke(messages);

        if (response.tool_calls?.length > 0) {
            const toolCall = response.tool_calls[0];
            const searchResult = await tavilyTool.invoke(toolCall.args);

            const finalResponse = await geminiWithTools.invoke([
                ...messages,
                response,
                { role: "tool", content: JSON.stringify(searchResult), tool_call_id: toolCall.id }
            ]);

            return normalizeContent(finalResponse.content);
        }

        return normalizeContent(response.content);
    } catch (error) {
        // Fallback to model without tools
        const response = await geminiModel.invoke(messages);
        return normalizeContent(response.content);
    }
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

    const messages = [
        new SystemMessage("You are GuruAI, a helpful and knowledgeable assistant. You have access to a search tool for real-time information."),
        ...history.map(msg =>
            msg.role === "human"
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        ),
        new HumanMessage(message)
    ]

    return await invokeWithTools(messages);
}

export const generateRetryResponse = async function (conversationId) {
    const history = await fetchHistory(conversationId)

    const messages = [
        new SystemMessage("You are GuruAI, a helpful and knowledgeable assistant. You have access to a search tool for real-time information."),
        ...history.map(msg =>
            msg.role === "human"
                ? new HumanMessage(msg.content)
                : new AIMessage(msg.content)
        )
    ]

    return await invokeWithTools(messages);
}