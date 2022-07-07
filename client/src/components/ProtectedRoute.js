import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useSelector(state => state.user)
    return (
        <>
            {
                loading === false && (isAuthenticated === true ?
                    <Outlet /> :
                    <Navigate to="/login" />)
            }
        </>
    )

}

export default ProtectedRoute