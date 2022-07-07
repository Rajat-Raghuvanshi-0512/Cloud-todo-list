import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'

const Profile = () => {
    const { user, loading, error } = useSelector(state => state.user)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }, [dispatch, error, alert]);

    return (
        <>
            {
                loading ? (
                    <Loader />)
                    :
                    (
                        <div className=" mx-10 md:mx-20 overflow-y-auto">
                            <div className='flex justify-center'>
                                <h1 className='font-bold text-3xl border-b text-center my-3 pb-3 min-w-[30vw]'>My Profile</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="my-3 md:px-20 flex items-center justify-center flex-col gap-4">
                                    <div className=' w-[200px] h-[200px] md:w-[300px] md:h-[300px]'>
                                        <img src={user.profilePhoto && user.profilePhoto.url} alt="profile" className='w-full h-full mx-auto rounded-full object-cover object-top' />
                                    </div>
                                </div>
                                <div className="p-3 my-2 details">
                                    <h3 className='text-lg text-center font-bold'>USER DETAILS</h3>
                                    <div className='p-2 pt-5'>
                                        <h4 className='fw-bold'>Name:</h4>
                                        <p className=' text-success px-3 opacity-75 fs-5 fw-bold'>{user.name}</p>
                                    </div>
                                    <div className='p-2'>
                                        <h4 className='fw-bold'>E-mail:</h4>
                                        <p className=' text-success px-3 opacity-75 fs-5 fw-bold'>{user.email}</p>
                                    </div>
                                    <div className='p-2'>
                                        <h4 className='fw-bold'>Joined On:</h4>
                                        <p className=' text-success px-3 opacity-75 fs-5 fw-bold'>{user.createdAt && user.createdAt.substr(0, 10)}</p>
                                    </div>
                                    <div className='text-center mt-5 flex justify-between w-full'>
                                        <button className="text-sm md:text-md text-white bg-blue-600 hover:bg-blue-800 transform duration-500 p-2 rounded" onClick={() => Navigate("/profile/update")}>Edit profile</button>
                                        <button className="text-sm md:text-md text-white bg-red-600 hover:bg-red-800 transform duration-500 p-2 rounded" onClick={() => Navigate("/password/change")}>Change password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Profile
