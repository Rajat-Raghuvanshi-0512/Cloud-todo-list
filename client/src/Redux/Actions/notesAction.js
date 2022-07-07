import axios from "axios"

export const addNote = (note) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_NOTE_REQUEST" })
        const { data } = await axios.post("/api/addnote", { ...note })
        dispatch({
            type: "ADD_NOTE_SUCCESS",
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: "ADD_NOTE_FAIL",
            payload: error.response.data.error
        })
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_NOTE_REQUEST" })
        const { data } = await axios.delete(`/api/delete/${id}`)
        dispatch({
            type: "DELETE_NOTE_SUCCESS",
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: "DELETE_NOTE_FAIL",
            payload: error.response.data.error
        })
    }
}

export const editNote = (id, note) => async (dispatch) => {
    try {
        dispatch({ type: "EDIT_NOTE_REQUEST" })
        const { data } = await axios.put(`/api/update/${id}`, { ...note })
        dispatch({
            type: "EDIT_NOTE_SUCCESS",
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: "EDIT_NOTE_FAIL",
            payload: error.response.data.error
        })
    }
}

export const getMyNotes = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_NOTES_REQUEST" })
        const { data } = await axios.get("/api/fetchnote")
        dispatch({
            type: "LOAD_NOTES_SUCCESS",
            payload: data.notes
        })
    } catch (error) {
        dispatch({
            type: "LOAD_NOTES_FAIL",
            payload: error.response.data.error
        })
    }
}