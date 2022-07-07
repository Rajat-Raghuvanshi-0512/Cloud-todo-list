import React, { useEffect, useState } from 'react'
import { useModal } from '../../misc/custom-hooks'
import Modal from '../Modal'
import { MdEdit } from "react-icons/md"
import { useDispatch } from 'react-redux'
import { editNote } from '../../Redux/Actions/notesAction'

const UpdateNoteBtnModal = ({ note: prevNote }) => {
    const { isOpen, openModal, closeModal } = useModal()
    const dispatch = useDispatch()
    const [note, setNote] = useState({
        title: "",
        desc: "",
        tag: ""
    })
    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setNote({ ...note, [name]: value })
    }

    const handleEdit = () => {
        dispatch(editNote(prevNote._id, note))
        closeModal()
    }
    useEffect(() => {
        setNote({
            title: prevNote.title,
            desc: prevNote.desc,
            tag: prevNote.tag
        })
    }, [prevNote])
    return (
        <>
            <button type="button" className='w-full text-center cursor-default'>
                <MdEdit className="w-8 h-8 mx-auto text-blue-400 hover:text-blue-600 transition duration-500 cursor-pointer" onClick={openModal} />
            </button>
            <Modal isOpen={isOpen} closeModal={closeModal} closeText="Cancel" onClick={handleEdit} submitText="Save Changes" title="Edit Modal" >
                <form method="post" className=' my-5' >
                    <div className="mb-3 flex flex-col px-5">
                        <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                        <input type="text" className="form-control p-2 rounded" placeholder='Enter Title*' minLength={5} required name="title" onChange={handleInput} value={note.title} id="title" />
                    </div>
                    <div className="mb-3 flex flex-col px-5">
                        <label htmlFor="desc" className="form-label">Description<span className="text-danger">*</span></label>
                        <textarea name="desc" minLength={5} required onChange={handleInput} value={note.desc} id="desc" rows="4" placeholder='Enter Tag' className='p-2 rounded resize-none' />
                    </div>
                    <div className="mb-3 flex flex-col px-5">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control p-2 rounded" placeholder='Enter Tag' name="tag" onChange={handleInput} value={note.tag} id="tag" />
                    </div>
                </form>
            </Modal>
        </>
    )
}


export default UpdateNoteBtnModal