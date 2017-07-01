import api from './api';

const getQueues = () => {
    return new Promise((resolve, reject) => {
        api.get('queue').then(({data}) => {
            resolve({queues: data.queues});
        }).catch(error => {
            if (error.response.status === 404) {
                return resolve({queues: []});
            }
            reject(error);
        });
    });
};

export default {
    getQueues
};
