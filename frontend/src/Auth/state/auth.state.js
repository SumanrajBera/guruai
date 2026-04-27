import { createSlice } from "@reduxjs/toolkit";

const userDets = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: true
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
        }
    }
})

export const { setUser, clearUser, setLoading } = userDets.actions
export default userDets.reducer