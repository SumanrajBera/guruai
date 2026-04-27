import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../hooks/auth'
import { Outlet } from 'react-router-dom'
import { setLoading } from '../state/auth.state'

const Protected = ({ children }) => {
    const dispatch = useDispatch()
    const { hydrate } = useAuth()
    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.auth.isLoading)
    useEffect(() => {
        hydrate()
    }, [])

    if (isLoading) return <div>Loading...</div>

    if (!user) return null

    return <Outlet />
}

export default Protected