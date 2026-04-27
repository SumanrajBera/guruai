import { useDispatch } from "react-redux";
import { login, register, resendMail, getMe } from "../services/auth.service";
import { setLoading, setUser } from "../state/auth.state";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const useAuth = function () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function registerUser(username, email, password) {
        try {
            dispatch(setLoading(true))
            const response = await register(username, email, password)
            toast.success(response.data.message)
            navigate(`/verify-email/${email}`)
        } catch (err) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
            if (err.response?.data?.isVerified === true) navigate(`/login`)
            else if (err.response?.data?.isVerified === false) navigate(`/verify-email/${email}`)
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function loginUser(identifier, password) {
        try {
            dispatch(setLoading(true))
            const response = await login(identifier, password)
            toast.success(response.data.message)
            navigate("/dashboard")
        } catch (err) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
            if (err.response?.data?.isVerified === false) navigate(`/verify-email/${identifier}`)
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function verfiyEmail(identifier) {
        try {
            dispatch(setLoading(true))
            const response = await resendMail(identifier)
            toast.success(response.data.message)
        } catch (err) {
            toast.error(err.response?.data?.message || "Something Went Wrong")
            if (err.response?.data?.isVerified === true) navigate(`/login`)
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function hydrate() {
        try {
            dispatch(setLoading(true))
            const response = await getMe()
            dispatch(setUser(response.data.username))
        } catch (err) {
            navigate("/login")
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { registerUser, loginUser, verfiyEmail, hydrate }
}

export default useAuth;