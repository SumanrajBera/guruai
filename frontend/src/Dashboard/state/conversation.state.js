import { createSlice } from '@reduxjs/toolkit'

const conversation = createSlice({
    name: "conversation",
    initialState: {
        activeConvoID: null,
        history: {},
        chats: {}
    },
    reducers: {
        setActiveConvoID: (state, action) => {
            state.activeConvoID = action.payload
        },
        clearActiveConvoID: (state) => {
            state.activeConvoID = null
        },
        setHistory: (state, action) => {
            state.history = { ...state.history, ...action.payload }
        },
        setChats: (state, action) => {
            const { convId, messages } = action.payload
            state.chats[convId] = messages
        },
        addChat: (state, action) => {
            const { convId, message } = action.payload
            if (!state.chats[convId]) state.chats[convId] = [] 
            state.chats[convId].push(message)
        },
        prependChats: (state, action) => {
            const { convId, messages } = action.payload
            state.chats[convId] = [...messages, ...state.chats[convId]]
        },
        updateHistory: (state, action) => {
            state.history[action.payload.id].updatedAt = action.payload.updatedAt
        }
    }
})

export const { setActiveConvoID, clearActiveConvoID, setHistory, setChats, addChat, prependChats, updateHistory } = conversation.actions
export default conversation.reducer