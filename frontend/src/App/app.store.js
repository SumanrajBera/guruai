import { configureStore } from "@reduxjs/toolkit"
import userDets from "../Auth/state/auth.state.js"

const store = configureStore({
    reducer: {
        user: userDets
    }
})

export default store