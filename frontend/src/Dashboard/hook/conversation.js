import { useDispatch, useSelector } from "react-redux"
import { chatHistory, conversationHistory, newConversation } from "../services/conv.service"
import { setLoading } from "../../Auth/state/auth.state"
import { toast } from "react-toastify"
import { addChat, clearTemp, prependChats, setActiveConvoID, setChats, setHistory, updateHistory } from "../state/conversation.state"

export const useConversation = function () {
    const dispatch = useDispatch()
    const tempMessages = useSelector(state => state.conv.chats["temp"])

    async function fetchConversationHistory(fetching) {
        try {
            fetching(true)
            const response = await conversationHistory()
            const conversations = response.data.conversations
            const historyMap = conversations.reduce((acc, conv) => {
                acc[conv._id] = conv
                return acc
            }, {})
            dispatch(setHistory(historyMap))
            // dispatch(setHistory(response.data.conversations))
        } catch (err) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
        } finally {
            fetching(false)
        }
    }

    async function fetchConversation(setIsAITyping, convId = null, input = null) {
        try {
            setIsAITyping(true)
            const message = input ?? tempMessages[0].content
            const response = await newConversation(message, convId)
            const { convId: returnedId, title, updatedAt, chats } = response.data

            dispatch(setActiveConvoID(returnedId))
            chats.forEach(msg => {
                if (msg.role !== 'human') dispatch(addChat({ convId: returnedId, message: msg }))
            })

            if (!convId) {
                dispatch(clearTemp())
                dispatch(setHistory({ [returnedId]: { _id: returnedId, title, updatedAt } }))
            } else {
                dispatch(updateHistory({ id: returnedId, updatedAt }))
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Something Went Wrong")
        } finally {
            setIsAITyping(false)
        }
    }

    async function fetchChatsHistory(convId, lt = null) {
        try {
            const response = await chatHistory(convId, lt)
            const { chats } = response.data
            if (lt) {
                dispatch(prependChats({ convId, messages: chats }))
            } else {
                dispatch(setChats({ convId, messages: chats }))
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
        }
    }

    return { fetchConversation, fetchConversationHistory, fetchChatsHistory }
}