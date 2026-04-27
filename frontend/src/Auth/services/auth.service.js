import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register(username, email, password) {
    console.log(username, email, password)
    const response = await api.post("/register", {
        username, email, password
    })

    return response
}

export async function login(identifier, password) {
    const response = await api.post("/login", {
        identifier, password
    })

    return response
}

export async function resendMail(identifier) {
    const response = await api.post("/resend", {
        identifier
    })

    return response
}

export async function getMe() {
    const response = await api.get("/getMe")

    return response
}