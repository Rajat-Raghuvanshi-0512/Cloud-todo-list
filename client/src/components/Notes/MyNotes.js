import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getMyNotes } from '../../Redux/Actions/notesAction';
import DeleteNoteBtnModal from './DeleteNoteBtnModal';
import UpdateNoteBtnModal from './UpdateNoteBtnModal';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';

export default function MyNotes() {
    const dispatch = useDispatch()
    const { notes, isUpdated, isDeleted, error } = useSelector(s => s.notes)
    const alert = useAlert()

    useEffect(() => {
        if (isUpdated) {
            alert.success("Note Updated")
            dispatch({ type: "EDIT_NOTE_RESET" })
        }
        if (isDeleted) {
            alert.success("Note Deleted")
            dispatch({ type: "DELETE_NOTE_RESET" })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERRORS" })
        }
        dispatch(getMyNotes())
    }, [isDeleted, isUpdated, dispatch, alert, error,])

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10 md:px-20 w-full">
                {notes?.length > 0 ? notes.map((note) => {
                    const { _id, title, desc, tag } = note;
                    return (
                        <div className="my-2" key={_id}>
                            <div className="shadow bg-gray-50 p-5 rounded -z-10">
                                <h3 className="card-title text-3xl font-bold pb-3 text-center">
                                    {title}
                                    {tag &&
                                        <span className="text-sm bg-blue-600 p-1 text-white rounded ml-2">{tag}</span>
                                    }
                                </h3>
                                <p className="card-text text-md pb-5"><span className="text-red-400">Description:</span>  {desc}</p>
                                <div className='flex'>
                                    <UpdateNoteBtnModal note={note} />
                                    <DeleteNoteBtnModal note={note} />
                                </div>
                            </div>
                        </div>
                    )
                })
                    : <div className="text-center w-full col-span-4 flex flex-col items-center justify-center h-[80vh]">
                        <ImCross className="text-5xl" />
                        <h1 className="text-2xl font-bold mt-5">No Notes Found</h1>
                        <Link to="/addnote" className="text-sm hover:text-slate-500">Add a note to get started</Link>
                    </div>}
            </div>
        </>
    )
}