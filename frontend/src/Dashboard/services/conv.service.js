import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api/chat",
    withCredentials: true
})

export const conversationHistory = async (lt = null) => {
    const response = await api.get("/conversationHistory", { params: { lt } })
    return response
}

export const newConversation = async (message, convId = null) => {
    const response = await api.post("/conversation", {
        message,
        convId
    })
    return response
}


export const chatHistory = async (convId, lt = null) => {
    const response = await api.get("/chatHistory", {
        params: {
            convId,
            lt
        }
    })
    return response
}