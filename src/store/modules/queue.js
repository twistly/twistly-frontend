import {queue} from '../../api/';
import * as types from '../mutation-types';

const state = {
    queues: [],
    error: null,
    stack: null
};

const getters = {
    queues: state => state.queues,
    queueError: state => state.error,
    queueStack: state => state.stack
};

const actions = {
    // Gets all the queues from Twistly
    getQueues({commit}) {
        return new Promise((resolve, reject) => {
            queue.getQueues().then(queues => {
                commit(types.QUEUE_RECIEVE_MULTIPLE, queues);
                resolve(queues);
            }).catch(err => { // eslint-disable-line unicorn/catch-error-name
                const {error, stack} = err.response.data;
                commit(types.QUEUE_FAILURE, {error, stack});
                reject(err);
            });
        });
    },
    addQueue({commit}, {name, blogs, interval, startHour, endHour}) {
        return new Promise((resolve, reject) => {
            queue.addQueue({name, blogs, interval, startHour, endHour}).then(queue => {
                commit(types.QUEUE_RECIEVE_SINGULAR, queue);
                resolve(queue);
            }).catch(err => { // eslint-disable-line unicorn/catch-error-name
                const {error, stack} = err.response.data;
                commit(types.QUEUE_FAILURE, {error, stack});
                reject(err);
            });
        });
    },
    deleteQueue({commit}, _id) {
        return new Promise((resolve, reject) => {
            queue.deleteQueue({_id}).then(queue => {
                commit(types.QUEUE_DELETED, _id);
                resolve(queue);
            }).catch(err => { // eslint-disable-line unicorn/catch-error-name
                const {error, stack} = err.response.data;
                commit(types.QUEUE_FAILURE, {error, stack});
                reject(err);
            });
        });
    }
};

const mutations = {
    [types.QUEUE_RECIEVE_SINGULAR](state, queue) {
        let foundQueue = state.queues.find(x => x.id === queue.id);
        if (foundQueue) {
            // Replace current store's version of the queue with the new one
            foundQueue = queue;
        } else {
            state.queues.push(queue);
        }
    },
    [types.QUEUE_RECIEVE_MULTIPLE](state, queues) {
        state.queues = queues;
    },
    [types.QUEUE_FAILURE](state, {error, stack}) {
        state.error = error;
        state.stack = stack;
    },
    [types.QUEUE_DELETED](state, _id) {
        const index = state.queues.map(queue => queue._id).indexOf(_id);
        state.queues.splice(index, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
