import axios from 'axios';

import {apiLogger as log} from '../log';

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000/',
    timeout: 5000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    const headers = request.headers || (request.headers = {});

    if (token !== null && token !== 'undefined') {
        log.debug(`setting token to ${token}`);
        headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, err => Promise.reject(err));

api.interceptors.response.use(response => {
    if (response.status && (response.status.code === 401 || response.status.code === 403)) {
        localStorage.removeItem('token');
    }

    return response;
}, err => Promise.reject(err));

export default api;
