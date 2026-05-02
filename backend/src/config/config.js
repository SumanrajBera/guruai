import dotenv from "dotenv";
dotenv.config()

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not available in the environment variable")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not available in the environment variable")
}

if (!process.env.GOOGLE_USER) {
    throw new Error("GOOGLE_USER is not available in the environment variable")
}

if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not available in the environment variable")
}

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not available in the environment variable")
}

if (!process.env.GOOGLE_APP_PASSWORD) {
    throw new Error("GOOGLE_APP_PASSWORD is not available in the environment variable")
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_USER: process.env.GOOGLE_USER,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
}