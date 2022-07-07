import { configureStore } from "@reduxjs/toolkit"
import { notesReducer } from "./Reducers/notesReducer";
import { userReducer, profileReducer } from "./Reducers/userReducer"


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        notes: notesReducer
    },
    devTools: true,
})

export default store;