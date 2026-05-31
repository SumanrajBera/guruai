import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { setLoading } from '../state/auth.state'

const Public = ({ children }) => {
    const dispatch = useDispatch()
    const { hydrate } = useAuth()
    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.auth.isLoading)
    useEffect(() => {
        hydrate()
    }, [])

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
    </div>
    if (user) return <Navigate to="/dashboard" replace />

    return <Outlet />
}

export default Public