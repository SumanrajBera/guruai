import { createSelector, createSlice } from '@reduxjs/toolkit'

const conversation = createSlice({
    name: "conversation",
    initialState: {
        activeConvoID: null,
        history: {},
        chats: { "temp": [] }
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
            if (convId) {
                if (!state.chats[convId]) state.chats[convId] = []
                state.chats[convId].push(message)
            } else {
                if (!state.chats["temp"]) state.chats["temp"] = []
                state.chats["temp"].push(message)
            }
        },
        prependChats: (state, action) => {
            const { convId, messages } = action.payload
            state.chats[convId] = [...messages, ...state.chats[convId]]
        },
        updateHistory: (state, action) => {
            state.history[action.payload.id].updatedAt = action.payload.updatedAt
        },
        clearTemp: (state) => {
            state.chats["temp"] = []
        }
    }
})

export const selectMessages = createSelector(
    state => state.conv.chats,
    (state, convoId) => convoId ?? "temp",
    (chats, key) => chats[key] ?? []
)

export const { setActiveConvoID, clearActiveConvoID, setHistory, setChats, addChat, prependChats, updateHistory, clearTemp } = conversation.actions
export default conversation.reducer