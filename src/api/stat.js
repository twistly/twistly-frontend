import api from './api';

const getStats = ({blogUrl, limit = 30}) => {
    return new Promise((resolve, reject) => {
        api.get(`stat/${blogUrl}`, {
            params: {
                limit
            }
        }).then(({data}) => {
            resolve({
                stats: data.stats
            });
        }).catch(error => {
            if (error.response.status === 404) {
                return resolve({stats: []});
            }
            reject(error);
        });
    });
};

export default {
    getStats
};
