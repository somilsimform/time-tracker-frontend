import API_ENDPOINTS from '../constants/api_endpoints'
import { axiosService } from '../services/axios.service';

const getAllLogsByStatus = () => {
    return axiosService.get(`${API_ENDPOINTS.ADMIN.GetAllLogs}`)
}

const updateLogStatus = body => {
    return axiosService.put(`${API_ENDPOINTS.ADMIN.UpdateLogStatus}`, body)
}

export {
    getAllLogsByStatus,
    updateLogStatus
}
