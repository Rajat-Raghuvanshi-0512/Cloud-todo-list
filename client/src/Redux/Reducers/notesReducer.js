import { createReducer } from "@reduxjs/toolkit"


export const notesReducer = createReducer({}, {
    ADD_NOTE_REQUEST: (state) => {
        state.loading = true
    },
    ADD_NOTE_SUCCESS: (state, action) => {
        state.loading = false
        state.isAdded = action.payload
    },
    ADD_NOTE_RESET: (state) => {
        state.loading = false
        state.isAdded = null
    },
    ADD_NOTE_FAIL: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    DELETE_NOTE_REQUEST: (state) => {
        state.loading = true
    },
    DELETE_NOTE_SUCCESS: (state, action) => {
        state.loading = false
        state.isDeleted = action.payload
    },
    DELETE_NOTE_RESET: (state) => {
        state.loading = false
        state.isDeleted = null
    },
    DELETE_NOTE_FAIL: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    EDIT_NOTE_REQUEST: (state) => {
        state.loading = true
    },
    EDIT_NOTE_SUCCESS: (state, action) => {
        state.loading = false
        state.isUpdated = action.payload
    },
    EDIT_NOTE_RESET: (state) => {
        state.loading = false
        state.isUpdated = null
    },
    EDIT_NOTE_FAIL: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    LOAD_NOTES_REQUEST: (state) => {
        state.loading = true
    },
    LOAD_NOTES_SUCCESS: (state, action) => {
        state.loading = false
        state.notes = action.payload
    },
    LOAD_NOTES_FAIL: (state, action) => {
        state.loading = false
        state.error = action.payload
    }
})

