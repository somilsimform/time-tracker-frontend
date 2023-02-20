import API_ENDPOINTS from '../constants/api_endpoints'
import { axiosService } from '../services/axios.service';

const getAllLogsByStatus = (status) => {
    return axiosService.get(`${API_ENDPOINTS.ADMIN.GetAllLogs}/${status}`)
}

const updateLogStatus = body => {
    return axiosService.put(`${API_ENDPOINTS.ADMIN.UpdateLogStatus}`, body)
}

export {
    getAllLogsByStatus,
    updateLogStatus
}
