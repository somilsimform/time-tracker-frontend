import {
    userLogin
} from '../../services/auth.service'
import { toast } from 'react-toastify'
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
        if (response?.status === 200) {
            localStorage.setItem('token', response.data?.data?.token)
            localStorage.setItem('user', JSON.stringify(response?.data?.data?.user))
            dispatch(loginSuccess(response.data.data))
        } else if (response?.status === 400) {
            toast.error('Please fill in the proper details.')
        }
        else if (response?.status === 401) {
            toast.error('Unauthorized User.')
        } else {
            toast.error('User not found.')
        }
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
