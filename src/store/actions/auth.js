import {
    userLogin
} from '../../services/auth.service'
import {
    AUTH_ERROR,
    AUTH_USER,
    AUTH_USER_LOADING,
    LOGOUT_USER
} from './actionTypes'

export const loginUser = (body) => async (dispatch) => {
    const loginStart = (payload) => ({
        type: AUTH_USER_LOADING,
        payload,
    })

    const loginSuccess = (payload) => ({
        type: AUTH_USER,
        payload,
    })

    const loginError = (payload) => ({
        type: AUTH_ERROR,
        payload,
    })

    try {
        dispatch(loginStart())
        const response = await userLogin(body)
        // setting token in local storage
        localStorage.setItem('token', response.data?.data?.token)
        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user))
        dispatch(loginSuccess(response.data.data))
    } catch (error) {
        dispatch(loginError(error))
    }
    // return 'done'
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}
