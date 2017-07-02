import api from './api';

const signin = ({username, password}) => {
    return new Promise((resolve, reject) => {
        api.post('token', {username, password}).then(({data}) => {
            resolve({
                token: data.token
            });
        }).catch(reject);
    });
};

const signup = ({username, email, password}) => {
    return new Promise((resolve, reject) => {
        api.post('user', {username, email, password}).then(({data}) => {
            resolve({
                token: data.token
            });
        }).catch(reject);
    });
};

export default {
    signin,
    signup
};
