import API_ENDPOINTS from '../constants/api_endpoints'
import { axiosService } from '../services/axios.service';

const userLogin = (body) => {
    return axiosService.post(`${API_ENDPOINTS.AUTH.Login}`, body)
}

export {
    userLogin
}
