import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from 'react-icons/io';

import { useEffect, useState } from "react";
import { changePass } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";


function UpdatePassword() {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { isChanged, error, loading } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.user)

    const [obj, setObj] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: ""
    })
    const Navigate = useNavigate()

    const handleChange = (e) => {
        setObj({ ...obj, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(changePass(obj))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERRORS" })
        }
        if (isChanged) {
            alert.success("Password Changed Successfully")
            Navigate("/profile")
            dispatch({ type: "UPDATE_PASSWORD_RESET" })
        }

    }, [isChanged, error, alert, dispatch, Navigate])


    return (
        <>
            {
                loading ? "Loading..." :
                    <div className='py-4 px-10 md:px-20 overflow-y-auto w-full bg-gray-50 h-[100vh]' >

                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 items-center cursor-pointer' onClick={() => Navigate(-1)}>
                                <div className="w-8 h-8">
                                    <IoIosArrowBack className="w-full h-full" />
                                </div>
                                <div className='text-2xl font-medium'>{user?.name}</div>
                            </div>

                            <div className='text-red-300 text-xl font-medium hidden sm:block'>
                                Change Password
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 ">
                            <div className='mt-8'>
                                <img src="/forgot_password.svg" alt="change password" className="w-[100%]" />
                            </div>

                            <div className='md:ml-14'>
                                <div className='mt-4'>
                                    <h1 className='font-bold text-2xl text-bms-500'>
                                        Want to change your Password?
                                    </h1>
                                </div>

                                <div>
                                    <form className="my-2" onSubmit={handleSubmit} >
                                        <div className="mb-6">
                                            <label htmlFor="password" className="text-lg">Current Password</label> <br />
                                            <input type="password" placeholder="******************" className=" w-3/4 text-black text-md mt-2 py-2 px-3 rounded focus:outline-bms-100" onChange={handleChange} required value={obj.oldPass} name="oldPass" autoComplete="current-password" />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="password" className="text-lg">New Password</label> <br />
                                            <input type="password" placeholder="******************" className=" w-3/4 text-black text-md mt-2 py-2 px-3 rounded focus:outline-bms-100" onChange={handleChange} required value={obj.newPass} name="newPass" autoComplete="new-password" />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="confirmPassword" className="text-lg">Re-enter New Password</label> <br />
                                            <input type="password" placeholder="******************" className=" w-3/4 text-black text-md mt-2 py-2 px-3 rounded focus:outline-bms-100" onChange={handleChange} required value={obj.confirmPass} name="confirmPass" autoComplete="new-password" />
                                        </div>

                                        <div className='flex gap-3 mt-6 flex-row-reverse w-3/4'>

                                            <button
                                                className="bg-blue-400 inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mb-1 duration-500 w-full"
                                                type="submit"
                                            >
                                                Update Password
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
            }
        </>
    )
}

export default UpdatePassword;