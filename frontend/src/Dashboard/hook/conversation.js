import { useDispatch, useSelector } from "react-redux"
import { chatHistory, conversationHistory, newConversation } from "../services/conv.service"
import { setLoading } from "../../Auth/state/auth.state"
import { toast } from "react-toastify"
import { addChat, clearTemp, prependChats, setActiveConvoID, setChats, setHistory, updateHistory } from "../state/conversation.state"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export const useConversation = function () {
    const dispatch = useDispatch()
    const tempMessages = useSelector(state => state.conv.chats["temp"])
    const fetchConversationRef = useRef(false)
    const navigate = useNavigate()

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
            if (err.response?.status === 401) {
                navigate("/login")
            } else {
                toast.error(err.response?.data?.message || "Something Went Wrong")
            }
        } finally {
            fetching(false)
        }
    }

    async function fetchConversation(setIsAITyping, convId = null, input = null) {
        try {
            if (!fetchConversationRef.current) {
                fetchConversationRef.current = true
                setIsAITyping(true)
                const message = input ?? tempMessages?.[0]?.content
                if (!message) {
                    setIsAITyping(false)
                    fetchConversationRef.current = false
                    return
                }
                const response = await newConversation(message, convId)
                const { convId: returnedId, title, updatedAt, chats, error } = response.data

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

                if (error) toast.error(error)

                setIsAITyping(false)
                fetchConversationRef.current = false
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login")
            } else {
                toast.error(err.response?.data?.message || "Something Went Wrong")
            }
            setIsAITyping(false)
            fetchConversationRef.current = false
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
            if (err.response?.status === 401) {
                navigate("/login")
            } else {
                toast.error(err.response?.data?.message || "Something Went Wrong")
            }
        }
    }

    return { fetchConversation, fetchConversationHistory, fetchChatsHistory }
}