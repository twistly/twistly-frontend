import api from './api';

const getQueues = () => {
    return new Promise((resolve, reject) => {
        api.get('queue').then(({status, data}) => {
            if (status === 204) {
                return resolve([]);
            }

            return resolve(data);
        }).catch(reject);
    });
};

const addQueue = ({name, blogs, interval, startTime, endTime}) => {
    return new Promise((resolve, reject) => {
        api.post('queue', {name, blogs, interval, startTime, endTime}).then(({data}) => {
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
