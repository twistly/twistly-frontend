import api from './api';

const getQueues = () => {
    return new Promise((resolve, reject) => {
        api.get('queue').then(({data}) => {
            resolve(data.queues);
        }).catch(error => {
            if (error.response.status === 404) {
                return resolve([]);
            }
            reject(error);
        });
    });
};

const addQueue = ({name, blogs, interval, startHour, endHour}) => {
    return new Promise((resolve, reject) => {
        api.post('queue', {name, blogs, interval, startHour, endHour}).then(({data}) => {
            resolve(data.queues);
        }).catch(reject);
    });
};

const deleteQueue = ({_id}) => {
    return new Promise((resolve, reject) => {
        api.delete(`queue/${_id}`).then(response => {
            if (response.status === 202) {
                return resolve();
            }
            // @TODO: Better error handling
            return reject(new Error('Could not delete queue.'));
        }).catch(reject);
    });
};

export default {
    getQueues,
    addQueue,
    deleteQueue
};
