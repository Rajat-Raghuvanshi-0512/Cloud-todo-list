import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../Redux/Actions/notesAction';

export default function AddNote() {
    const dispatch = useDispatch()
    const { isAdded, error } = useSelector(s => s.notes)
    const alert = useAlert()

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
    const handleOnClick = (e) => {
        e.preventDefault();
        dispatch(addNote(note))
        setNote({ title: "", desc: "", tag: "" });
    }
    useEffect(() => {
        if (isAdded) {
            alert.success("Note Added")
            dispatch({ type: "ADD_NOTE_RESET" })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }, [isAdded, error, dispatch, alert])
    return (

        <div className="new-container md:px-20 flex items-center justify-center flex-col ">
            <div className='bg-slate-50 p-5 md:p-10 rounded-lg min-w-[50%]'>
                <h1 className='mb-3 text-3xl font-bold text-center'>Add a note</h1>
                <form method="post" onSubmit={handleOnClick}>
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="title" className="form-label">Title<span className="text-danger">*</span></label>
                        <input type="text" className=" w-full p-2" minLength={3} required name="title" onChange={handleInput} value={note.title} id="title" placeholder="Enter Title (Atleast 3 characters)" />
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="desc" className="form-label">Description<span className="text-danger">*</span></label>
                        <textarea name="desc" minLength={5} required onChange={handleInput} value={note.desc} id="desc" rows="4" placeholder="Enter Description (Atleast 5 characters)" className='p-2 resize-none' />
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className=" w-full p-2" name="tag" onChange={handleInput} value={note.tag} id="tag" placeholder="Enter Tag" />
                    </div>
                    <button type="submit" className="w-full bg-slate-600 hover:bg-slate-800 text-white py-2 rounded transition duration-500">Add Note</button>
                </form>
            </div>
        </div>
    )
}
