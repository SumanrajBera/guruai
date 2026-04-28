import { configureStore } from "@reduxjs/toolkit"
import userDets from "../Auth/state/auth.state.js"
import conversation from "../Dashboard/state/conversation.state.js"

const store = configureStore({
    reducer: {
        auth: userDets,
        conv: conversation
    }
})

export default store