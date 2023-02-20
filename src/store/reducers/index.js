import { combineReducers } from 'redux'
import { LOGOUT_ERROR, LOGOUT_SUCCESS } from '../actions/actionTypes'
import projectReducer from './project'
import authReducer from './auth'

const appReducer = combineReducers({
    project: projectReducer,
    auth: authReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS || action.type === LOGOUT_ERROR) {
        // eslint-disable-next-line no-param-reassign
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer
