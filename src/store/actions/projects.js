import { toast } from 'react-toastify'
import {
    getAllProjects,
    getAllTaskByProjectId,
    addProjectLog,
    getLogsByProjectID,
    getLogsByTaskID,
    getTaskByUsers,
    getLogsByViewType,
    updateLogs,
} from '../../services/projects.service'
import {
    getAllLogsByStatus,
    updateLogStatus

} from '../../services/admin.service'
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
    UPDATE_PROJECT_LOG_START,
    UPDATE_PROJECT_LOG_SUCCESS,
    UPDATE_PROJECT_LOG_ERROR,
    GET_LOGS_BY_PROJECT_ID_START,
    GET_LOGS_BY_PROJECT_ID_SUCCESS,
    GET_LOGS_BY_PROJECT_ID_ERROR,
    GET_LOGS_BY_TASK_ID_START,
    GET_LOGS_BY_TASK_ID_SUCCESS,
    GET_LOGS_BY_TASK_ID_ERROR,
    GET_LOGS_BY_VIEW_START,
    GET_LOGS_BY_VIEW_SUCCESS,
    GET_LOGS_BY_VIEW_ERROR,
    UPDATE_LOGS_STATUS
} from './actionTypes'

export const getProjects = () => async (dispatch) => {
    const getProjectsStart = (payload) => ({
        type: GET_ALL_PROJECTS_START,
        payload,
    })

    const getProjectsSuccess = (payload) => ({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload,
    })

    const getProjectsError = (payload) => ({
        type: GET_ALL_PROJECTS_ERROR,
        payload,
    })

    try {
        await dispatch(getProjectsStart())
        const response = await getAllProjects()
        console.log(response, 'RESPONSE');
        await dispatch(getProjectsSuccess(response?.data?.data?.projects.map(project => {
            return { value: project?.id, label: project?.name }
        })))
    } catch (error) {
        dispatch(getProjectsError(error))
    }
}

export const getProjectTasks = (id) => async (dispatch) => {
    const getProjectTaskStart = (payload) => ({
        type: GET_ALL_PROJECTS_TASK_START,
        payload,
    })

    const getProjectTaskSuccess = (payload) => ({
        type: GET_ALL_PROJECTS_TASK_SUCCESS,
        payload,
    })

    const getProjectTaskError = (payload) => ({
        type: GET_ALL_PROJECTS_TASK_ERROR,
        payload,
    })

    try {
        await dispatch(getProjectTaskStart())
        const response = await getAllTaskByProjectId(id)
        await dispatch(getProjectTaskSuccess(response?.data?.data?.tasks.map(project => {
            return { value: project?.id, label: project?.name }
        })))
    } catch (error) {
        dispatch(getProjectTaskError(error))
    }
}

export const clearTasks = () => async (dispatch) => {
    return {
        type: CLEAR_ALL_TASKS
    }
}

export const addProjectLogs = (body) => async (dispatch) => {
    const addProjectLogsStart = (payload) => ({
        type: ADD_PROJECT_LOG_START,
        payload,
    })

    const addProjectLogsSuccess = (payload) => ({
        type: ADD_PROJECT_LOG_SUCCESS,
        payload,
    })

    const addProjectLogsError = (payload) => ({
        type: ADD_PROJECT_LOG_ERROR,
        payload,
    })

    await dispatch(addProjectLogsStart())
    const resp = await addProjectLog(body)
    console.log(resp, 'RESP');
    if (resp?.status != 200) {
        dispatch(addProjectLogsError())
        toast.error('Please fill in all the details!')
    } else {
        await dispatch(addProjectLogsSuccess())
        toast.info('Log added successfully!')
    }
    // try {
    // } catch (error) {
    //     
    // }
}

export const getLogsByProjectId = (body) => async (dispatch) => {
    const getLogsByProjectIdStart = (payload) => ({
        type: GET_LOGS_BY_PROJECT_ID_START,
        payload,
    })

    const getLogsByProjectIdSuccess = (payload) => ({
        type: GET_LOGS_BY_PROJECT_ID_SUCCESS,
        payload,
    })

    const getLogsByProjectIdError = (payload) => ({
        type: GET_LOGS_BY_PROJECT_ID_ERROR,
        payload,
    })

    await dispatch(getLogsByProjectIdStart())
    const resp = await getLogsByProjectID(body)
    console.log(resp, 'resp?.data?.logs');
    await dispatch(getLogsByProjectIdSuccess(resp?.data?.data?.logs))
    // if (resp) {

    //     if (resp?.status != 200) {
    //         dispatch(getLogsByProjectIdError())
    //         toast.error('Please select the project!')
    //     } else {
    //         toast.info('Log added successfully!')
    //     }
    // }
    // try {
    // } catch (error) {
    //     
    // }
}

export const getLogsByTaskId = (body) => async (dispatch) => {
    const getLogsByTaskIdStart = (payload) => ({
        type: GET_LOGS_BY_TASK_ID_START,
        payload,
    })

    const getLogsByTaskIdSuccess = (payload) => ({
        type: GET_LOGS_BY_TASK_ID_SUCCESS,
        payload,
    })

    const ggetLogsByTaskIdError = (payload) => ({
        type: GET_LOGS_BY_TASK_ID_ERROR,
        payload,
    })

    await dispatch(getLogsByTaskIdStart())
    const resp = await getLogsByTaskID(body)
    await dispatch(getLogsByTaskIdSuccess(resp?.data?.data?.logs))
    // if (resp) {

    //     if (resp?.status != 200) {
    //         dispatch(getLogsByProjectIdError())
    //         toast.error('Please select the project!')
    //     } else {
    //         toast.info('Log added successfully!')
    //     }
    // }
    // try {
    // } catch (error) {
    //     
    // }
}

export const getTasksByUserId = (id) => async (dispatch) => {
    const getProjectTaskStart = (payload) => ({
        type: GET_ALL_PROJECTS_TASK_START,
        payload,
    })

    const getProjectTaskSuccess = (payload) => ({
        type: GET_ALL_PROJECTS_TASK_SUCCESS,
        payload,
    })

    const getProjectTaskError = (payload) => ({
        type: GET_ALL_PROJECTS_TASK_ERROR,
        payload,
    })

    try {
        await dispatch(getProjectTaskStart())
        const response = await getTaskByUsers(id)
        await dispatch(getProjectTaskSuccess(response?.data?.data?.tasks.map(task => {
            return { value: task?.id, label: task?.name }
        })))
    } catch (error) {
        dispatch(getProjectTaskError(error))
    }
}

export const getLogsByViewTYPE = (body) => async (dispatch) => {
    const getLogsByViewStart = (payload) => ({
        type: GET_LOGS_BY_VIEW_START,
        payload,
    })

    const getLogsByViewSuccess = (payload) => ({
        type: GET_LOGS_BY_VIEW_SUCCESS,
        payload,
    })

    const getLogsByViewError = (payload) => ({
        type: GET_LOGS_BY_VIEW_ERROR,
        payload,
    })

    await dispatch(getLogsByViewStart())
    const resp = await getLogsByViewType(body)
    console.log(resp, 'RESP-VIEW');
    await dispatch(getLogsByViewSuccess(resp?.data?.data))
}

export const updateProjectLogs = (body) => async (dispatch) => {
    const updateProjectLogsStart = (payload) => ({
        type: UPDATE_PROJECT_LOG_START,
        payload,
    })

    const updateProjectLogsSuccess = (payload) => ({
        type: UPDATE_PROJECT_LOG_SUCCESS,
        payload,
    })

    const updateProjectLogsError = (payload) => ({
        type: UPDATE_PROJECT_LOG_ERROR,
        payload,
    })

    await dispatch(updateProjectLogsStart())
    const resp = await updateLogs(body)
    if (resp?.status != 200) {
        dispatch(updateProjectLogsError())
        toast.error('Please fill in all the details!')
    } else {
        await dispatch(updateProjectLogsSuccess())
        toast.info('Log updated successfully!')
    }
}

export const getAllLogs = (status) => async dispatch => {
    const getLogsByTaskIdStart = (payload) => ({
        type: GET_LOGS_BY_TASK_ID_START,
        payload,
    })

    const getLogsByTaskIdSuccess = (payload) => ({
        type: GET_LOGS_BY_TASK_ID_SUCCESS,
        payload,
    })

    const getLogsByTaskIdError = (payload) => ({
        type: GET_LOGS_BY_TASK_ID_ERROR,
        payload,
    })

    await dispatch(getLogsByTaskIdStart())
    const resp = await getAllLogsByStatus(status)
    await dispatch(getLogsByTaskIdSuccess(resp?.data?.data?.logs))
}

export const updateProjectLogStatus = async (body) => {
    const resp = await updateLogStatus(body)
    if (resp) {
        return {
            type: UPDATE_LOGS_STATUS
        }
    }
}