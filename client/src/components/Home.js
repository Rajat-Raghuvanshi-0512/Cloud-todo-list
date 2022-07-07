import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { isAuthenticated } = useSelector(s => s.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/mynotes")
        }
    }, [isAuthenticated, navigate])
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full -translate-y-10 fixed w-full text-center -z-10" >
                <h1 className='text-3xl md:text-5xl font-bold text-blue-500 mb-5'>WELCOME TO NOTES COLLECTOR</h1>
                <h3 className='text-xl md:text-3xl font-bold text-red-500'>Your Notes on the cloud</h3>
            </div>
        </>
    )
}
