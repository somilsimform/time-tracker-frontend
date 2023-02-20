import API_ENDPOINTS from '../constants/api_endpoints'
import { axiosService } from '../services/axios.service';


const getAllProjects = () => {
    return axiosService.get(`${API_ENDPOINTS.PROJECTS.GetAllProjects}`)
}

const getAllTaskByProjectId = (project_id) => {
    return axiosService.post(`${API_ENDPOINTS.TASK.GetAllTaskByProjectID}`, { project_id })
}

const addProjectLog = (body) => {
    return axiosService.post(`${API_ENDPOINTS.PROJECTS.AddProjectLog}`, body)
}

const getLogsByProjectID = (body) => {
    return axiosService.post(`${API_ENDPOINTS.PROJECTS.GetLogsByProject}`, body)
}

const getLogsByTaskID = (body) => {
    return axiosService.post(`${API_ENDPOINTS.PROJECTS.GetLogsByTask}`, body)
}

const getTaskByUsers = (id) => {
    return axiosService.get(`${API_ENDPOINTS.PROJECTS.GetTaskByUser}/${id}`)
}

const getLogsByViewType = ({ startDate, endDate, unit, userId }) => {
    return axiosService.get(`${API_ENDPOINTS.PROJECTS.GetLogsByViewType}/${startDate}/${endDate}/${unit}/${userId}`)
}

const updateLogs = (body) => {
    return axiosService.put(`${API_ENDPOINTS.PROJECTS.UpdateLogs}`, body)
}

export {
    getAllProjects,
    getAllTaskByProjectId,
    addProjectLog,
    getLogsByProjectID,
    getLogsByTaskID,
    getTaskByUsers,
    getLogsByViewType,
    updateLogs
}
