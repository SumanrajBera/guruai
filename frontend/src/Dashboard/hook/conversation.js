import { useDispatch } from "react-redux"
import { conversationHistory, newConversation } from "../services/conv.service"
import { setLoading } from "../../Auth/state/auth.state"
import { toast } from "react-toastify"
import { setHistory } from "../state/conversation.state"

export const useConversation = function () {
    const dispatch = useDispatch()

    async function fetchConversationHistory(fetching) {
        try {
            fetching(true)
            const response = await conversationHistory()
            dispatch(setHistory(response.data.conversations))
        } catch (err) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
        } finally {
            fetching(false)
        }
    }

    async function fetchConversation(message, convId = null) {
        try {
            dispatch(setLoading(true))
            const response = await newConversation(message, convId)
        } catch (err) {
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { fetchConversation, fetchConversationHistory }
}