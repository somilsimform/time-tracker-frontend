

import {

} from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    isSuccess: false,
    user: null,
    error: null,
    userProfile: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

        default:
            return state
    }
}
