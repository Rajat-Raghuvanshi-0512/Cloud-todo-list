import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { TiEdit } from 'react-icons/ti';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUser, updateProfile } from "../../Redux/Actions/userActions";
import Loader from "../Loader/Loader";


function UpdateProfile() {

    const { user } = useSelector(state => state.user)
    const { isUpdated, error, loading } = useSelector(state => state.profile)
    const alert = useAlert()
    const Navigate = useNavigate();
    const dispatch = useDispatch()

    const inputFile = useRef()
    const coverFile = useRef()

    const [Avatar, setAvatar] = useState("")
    const [AvatarPreview, setAvatarPreview] = useState("")
    const [state, setState] = useState({
        name: "",
        email: ""
    })

    const handleChange = (e, state, setState) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "photo" || name === "cphoto") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                if (reader.readyState === 2) {
                    if (name === "photo") {
                        setAvatar(reader.result)
                        setAvatarPreview(reader.result)
                    }
                }
            }
        }
        else {
            setState({ ...state, [name]: value })
        }
    }
    const onButtonClick = (file) => {
        file.current.click();
    };



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ ...state, profilePhoto: Avatar }))
    }

    useEffect(() => {
        if (isUpdated) {
            alert.success("Profile Updated Successfully")
            dispatch({ type: "UPDATE_PROFILE_RESET" })
            dispatch(loadUser())
            Navigate("/profile")
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERRORS" })
        }

    }, [isUpdated, alert, error, dispatch, Navigate])

    useEffect(() => {
        setState({
            name: user?.name || "",
            email: user?.email || ""
        })
        setAvatarPreview(user?.profilePhoto?.url || "")
    }, [user])

    return (
        <>

            <div className='py-4 px-10 md:px-20 overflow-y-auto h-[90vh] w-full bg-gray-50' >
                {
                    loading ? <Loader /> :
                        <>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-3 items-center cursor-pointer' onClick={() => Navigate(-1)}>
                                    <div className="w-8 h-8">
                                        <IoIosArrowBack className="w-full h-full" />
                                    </div>
                                    <div className='text-2xl font-medium'>{user?.name}</div>
                                </div>
                                <div className='text-gray-600 text-xl font-medium hidden sm:block'>
                                    Edit Profile
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className='profile_header relative mt-2'>
                                    <div className='w-[200px] h-[200px] md:w-[300px] m-auto md:h-[300px] mt-8'>
                                        <div className='relative w-full h-full'>
                                            <img
                                                src={AvatarPreview}
                                                alt="profile "
                                                className='w-full h-full rounded-full border object-cover object-top'
                                            />
                                            <TiEdit
                                                title='Edit Your Profile Image'
                                                className='cursor-pointer absolute right-2 bottom-2 w-10 h-10'
                                                onClick={() => onButtonClick(inputFile)}
                                            />
                                        </div>
                                        <input className="hidden" ref={inputFile} type="file" name="photo" id="photo" accept="image/*" onChange={handleChange} />
                                        <input className="hidden" ref={coverFile} type="file" name="cphoto" id="cphoto" accept="image/*" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className='mt-8'>
                                    <form className='my-6 mx-3' onSubmit={handleSubmit}>

                                        <div className="mb-4">
                                            <label htmlFor="name" className="text-lg font-medium">Name</label> <br />
                                            <input type="text" className="focus:bg-white w-full md:w-3/4 text-md mt-2 py-2 px-3 rounded focus:outline-bms-100 text-black" placeholder="Enter Your Name" name="name" value={state.name} required onChange={(e) => handleChange(e, state, setState)} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="text-lg font-medium">Email</label> <br />
                                            <input type="email" className="w-full md:w-3/4 text-md mt-2 py-2 px-3 rounded focus:outline-none select-none text-black cursor-default" placeholder="Enter Your Name" name="email" value={state.email} required onChange={(e) => handleChange(e, state, setState)} readOnly />
                                        </div>

                                        <div className='flex gap-3 mt-6 flex-row-reverse w-full md:w-3/4'>
                                            <button
                                                className="bg-blue-400 inline-flex justify-center px-4 py-2 text-sm font-medium text-white hover:text-blue-400 border border-transparent rounded-md hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mb-1 transition duration-500"
                                                type="submit"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default UpdateProfile;