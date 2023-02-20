import axios from 'axios';
import config from '../config/config';


export const axiosService = {
    get,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint) {
    console.log(getOptions(), 'getOptions');
    return axios.get(config.baseUrl + apiEndpoint, getOptions()).then((response) => {
        return response;
    }).catch((err) => {
        console.log("Error in response");
        console.log(err);
    })
}

function post(apiEndpoint, payload) {
    return axios.post(config.baseUrl + apiEndpoint, payload, getOptions()).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
        return err.response
    })
}

function put(apiEndpoint, payload) {
    return axios.put(config.baseUrl + apiEndpoint, payload, getOptions()).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
    })
}

function deleteDetail(apiEndpoint) {
    return axios.delete(config.baseUrl + apiEndpoint, getOptions()).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
    })
}

function getOptions() {
    let options = {}
    // let options = {};
    options.headers = { 'x-access-token': localStorage.getItem('token'), "Access-Control-Allow-Origin": '*' };
    console.log(options, "HEADERS");
    return options;
}