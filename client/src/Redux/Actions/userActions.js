import axios from "axios"

//Register user
export const registerUser = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_REQUEST" })
        const { data } = await axios.post("/api/signup", { ...userdata }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: {
                user: data.user,
                isAuthenticated: data.success
            }
        })
    } catch (error) {
        dispatch({
            type: "REGISTER_FAIL",
            payload: error.response.data.error
        })
    }
}

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" })
        const { data } = await axios.get("/api/aboutme")
        dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: {
                user: data.user,
                isAuthenticated: data.success
            }
        })
    } catch (error) {
        dispatch({
            type: "LOAD_USER_FAIL",
            payload: error.response.data.error
        })
    }
}

//Login user
export const loginUser = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" })
        const { data } = await axios.post("/api/login", { ...userdata }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                user: data.user,
                isAuthenticated: data.success
            }
        })
    } catch (error) {
        dispatch({
            type: "LOGIN_FAIL",
            payload: error.response.data.error
        })
    }
}

//forgot Password

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: "FORGOT_REQUEST" })
        const { data } = await axios.post("/api/v1/password/forgot", { email }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "FORGOT_SUCCESS",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "FORGOT_FAIL",
            payload: error.response.data.error
        })
    }
}


//Reset Password
export const resetPassword = (token, userdata) => async (dispatch) => {
    try {
        dispatch({ type: "FORGOT_REQUEST" })
        const { data } = await axios.put(`/api/v1/resetPassword/${token}`, { ...userdata }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "FORGOT_SUCCESS",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "FORGOT_FAIL",
            payload: error.response.data.error
        })
    }
}


//Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_REQUEST" })
        const { data } = await axios.get(`/api/logout`)
        dispatch({
            type: "LOGOUT_SUCCESS",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "LOGOUT_FAIL",
            payload: error.response.data.error
        })
    }
}


//Logout User
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PROFILE_REQUEST" })
        const { data } = await axios.put(`/api/me/update`, { ...userData }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "UPDATE_PROFILE_SUCCESS",
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: "UPDATE_PROFILE_FAIL",
            payload: error.response.data.error
        })
    }
}


//Logout User
export const changePass = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PASSWORD_REQUEST" })
        const { data } = await axios.put(`/api/password/update`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "UPDATE_PASSWORD_SUCCESS",
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: "UPDATE_PASSWORD_FAIL",
            payload: error.response.data.error
        })
    }
}


//Logout User
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "GET_USER_DETAILS_REQUEST" })
        const { data } = await axios.get(`/api/user/${id}`)
        dispatch({
            type: "GET_USER_DETAILS_SUCCESS",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "GET_USER_DETAILS_FAIL",
            payload: error.response.data.error
        })
    }
}