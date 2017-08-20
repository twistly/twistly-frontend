import axios from 'axios';
import wrapper from 'axios-cache-plugin';
import store from '../store';
import {apiLogger as log} from '../log';

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000/',
    timeout: 5000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

const cache = wrapper(api, {
    maxCacheSize: 15,
    ttl: 1000
});

api.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    const headers = request.headers || (request.headers = {});

    if (token !== null && token !== 'undefined') {
        log.debug(`setting token to ${token}`);
        headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        store._actions.tokenExpired[0]();
    } else {
        return Promise.reject(error);
    }
});

export default cache;
