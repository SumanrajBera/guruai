import { createSlice } from "@reduxjs/toolkit";

const userDets = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: true,
        theme: localStorage.getItem("theme") || "light"
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem("theme", action.payload)
        }
    }
})

export const { setUser, clearUser, setLoading, setTheme } = userDets.actions
export default userDets.reducer