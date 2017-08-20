import api from './api';

const getStats = ({url, limit = 30}) => {
    return new Promise((resolve, reject) => {
        api.get(`stat/${url}`, {
            params: {
                limit
            }
        }).then(({data}) => {
            if (data.message) {
                return reject(new Error(data.message));
            }

            resolve(data.stats);
        }).catch(error => {
            if (error.response.status === 404) {
                return resolve([]);
            }

            return reject(error);
        });
    });
};

export default {
    getStats
};
