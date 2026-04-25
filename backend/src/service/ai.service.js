import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";

export const geminiModel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: config.GEMINI_API_KEY
});

export const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    apiKey: config.MISTRAL_API_KEY
});