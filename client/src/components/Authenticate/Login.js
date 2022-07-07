import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../Redux/Actions/userActions';

function Login() {
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, error, loading } = useSelector(s => s.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginMe = async (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERRORS" })
        }
        if (loading === false && isAuthenticated === true) {
            alert.success("Logged In")
            navigate("/")
        }
    }, [isAuthenticated, alert, navigate, error, dispatch, loading])

    return (
        <div className="flex justify-center items-center mt-12">
            <div className="dark:bg-slate-700 dark:text-white p-10 rounded-lg bg-gray-50 drop-shadow">
                <h1 className="text-center text-3xl font-bold">Log-In</h1>
                <form method="post" onSubmit={LoginMe}>
                    <div className="w-full mt-5">
                        <label>Email</label>
                        <input type="email" required name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full rounded p-2" placeholder="Enter your email" />
                    </div>
                    <div className="w-full mt-5">
                        <label>Password</label>
                        <input type="password" required name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full rounded p-2" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="w-full mt-6 dark:bg-white dark:text-black rounded py-2 my-3 dark:hover:bg-gray-200 transition-all duration-500 bg-slate-700 text-white hover:bg-slate-800"  >Login</button>
                    <div className="text-center w-full">
                        Not a member? <Link to="/signup" className='hover:underline'>Sign-up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
