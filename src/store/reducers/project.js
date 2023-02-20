import {
    GET_ALL_PROJECTS_START,
    GET_ALL_PROJECTS_SUCCESS,
    GET_ALL_PROJECTS_ERROR,
    GET_ALL_PROJECTS_TASK_START,
    GET_ALL_PROJECTS_TASK_SUCCESS,
    GET_ALL_PROJECTS_TASK_ERROR,
    CLEAR_ALL_TASKS,
    ADD_PROJECT_LOG_START,
    ADD_PROJECT_LOG_SUCCESS,
    ADD_PROJECT_LOG_ERROR,
    GET_LOGS_BY_PROJECT_ID_START,
    GET_LOGS_BY_PROJECT_ID_SUCCESS,
    GET_LOGS_BY_PROJECT_ID_ERROR,
    GET_LOGS_BY_TASK_ID_START,
    GET_LOGS_BY_TASK_ID_SUCCESS,
    GET_LOGS_BY_TASK_ID_ERROR,
    GET_LOGS_BY_VIEW_START,
    GET_LOGS_BY_VIEW_SUCCESS,
    AUTH_USER_LOADING,
    AUTH_ERROR,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_PROJECT_LOG_START,
    UPDATE_PROJECT_LOG_SUCCESS,
    UPDATE_PROJECT_LOG_ERROR,
    UPDATE_LOGS_STATUS
} from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    isSuccess: false,
    logs: [],
    viewLogs: [],
    projects: [],
    tasks: [],
    error: {},
    isAuthenticated: false,
    user: null,
    error: null,
    userProfile: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return {
                ...state,
                isSuccess: false,
                error: null,
                isAuthenticated: true,
                user: null,
                isLoading: false,
            }
        case AUTH_USER_LOADING:
            return { ...state, isLoading: true }
        case AUTH_USER:
            console.log(action.payload?.user, 'REDUCER-Project');
            return {
                ...state,
                isSuccess: true,
                error: null,
                isAuthenticated: true,
                user: action?.payload?.data?.user,
                isLoading: false,
            }
        case AUTH_ERROR:
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                error: action.payload,
                user: null,
            }
        case GET_ALL_PROJECTS_START:
            return { ...state, isLoading: true }
        case GET_ALL_PROJECTS_SUCCESS:
            return { ...state, projects: action.payload }
        case GET_ALL_PROJECTS_ERROR:
            return { ...state, isLoading: false }
        case GET_ALL_PROJECTS_TASK_START:
            return { ...state, isLoading: true }
        case GET_ALL_PROJECTS_TASK_SUCCESS:
            return { ...state, tasks: action.payload }
        case GET_ALL_PROJECTS_TASK_ERROR:
            return { ...state, isLoading: false }
        case CLEAR_ALL_TASKS:
            return { ...state, tasks: [] }
        case ADD_PROJECT_LOG_START:
            return { ...state, isLoading: true }
        case ADD_PROJECT_LOG_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true }
        case ADD_PROJECT_LOG_ERROR:
            return { ...state, isLoading: false, isSuccess: false }
        case GET_LOGS_BY_PROJECT_ID_START:
            return { ...state, isLoading: true }
        case GET_LOGS_BY_PROJECT_ID_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, logs: action.payload }
        case GET_LOGS_BY_PROJECT_ID_ERROR:
            return { ...state, isLoading: false }
        case GET_LOGS_BY_TASK_ID_START:
            return { ...state, isLoading: true }
        case GET_LOGS_BY_TASK_ID_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, logs: action.payload }
        case GET_LOGS_BY_TASK_ID_ERROR:
            return { ...state, isLoading: false }
        case GET_LOGS_BY_VIEW_START:
            return { ...state, isLoading: true }
        case GET_LOGS_BY_VIEW_SUCCESS:
            return {
                ...state,
                viewLogs: action.payload
            }
        case UPDATE_PROJECT_LOG_START:
            return { ...state, isLoading: true }
        case UPDATE_PROJECT_LOG_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true }
        case UPDATE_PROJECT_LOG_ERROR:
            return { ...state, isLoading: false }
        case UPDATE_LOGS_STATUS:
            return { ...state, isLoading: false }
        default:
            return state
    }
}
