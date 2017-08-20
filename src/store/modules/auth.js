import dotProp from 'dot-prop';
import router from '../../router';
import {auth} from '../../api';
import * as types from '../mutation-types';

const state = {
    isAuthenticated: false,
    error: null,
    stack: null
};

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    // UserError should be a user readable error message in their selected language
    authUserError: state => {
        const error = dotProp.get(state.error, 'response.data.error');
        // If we have multiple errors we just return the first and let the user submit again to get the next one.
        if (error === 'Validation failed') {
            return dotProp.get(state.error, 'response.data.details')[0].message;
        }
        return error;
    },
    authError: state => state.error,
    authStack: state => state.stack
};

const actions = {
    signin({commit}, {username, password}) {
        return new Promise(resolve => {
            auth.signin({username, password}).then(({token}) => {
                commit(types.AUTHENTICATION_SUCCESS, {token});
                resolve({token});
            }).catch(err => { // eslint-disable-line unicorn/catch-error-name
                if (err.message) {
                    commit(types.AUTHENTICATION_FAILURE, {
                        error: err
                    });
                } else {
                    const {error, stack} = err.response.data;
                    commit(types.AUTHENTICATION_FAILURE, {error, stack});
                }
            });
        });
    },
    signup({commit}, {username, email, password}) {
        return new Promise(resolve => {
            auth.signup({username, email, password}).then(({token}) => {
                commit(types.AUTHENTICATION_SUCCESS, {token});
                resolve({token});
            }).catch(err => { // eslint-disable-line unicorn/catch-error-name
                if (err.message) {
                    commit(types.AUTHENTICATION_FAILURE, {
                        error: err
                    });
                } else {
                    const {error, stack} = err.response.data;
                    commit(types.AUTHENTICATION_FAILURE, {error, stack});
                }
            });
        });
    },
    signout({commit}) {
        return new Promise(resolve => {
            commit(types.AUTHENTICATION_SIGNOUT);
            resolve();
        });
    },
    checkAuth({commit}) {
        return new Promise(resolve => {
            const token = localStorage.getItem('token');
            if (token) {
                commit(types.AUTHENTICATION_SUCCESS, {token});
            } else {
                commit(types.AUTHENTICATION_SIGNOUT);
            }
            resolve({token});
        });
    },
    tokenExpired({commit}) {
        return new Promise(resolve => {
            commit(types.AUTHENTICATION_TOKEN_EXPIRED);
            resolve();
        });
    }
};

const mutations = {
    [types.AUTHENTICATION_SUCCESS](state, {token}) {
        localStorage.setItem('token', token);
        state.isAuthenticated = true;
        state.error = null;
        state.stack = null;
    },
    [types.AUTHENTICATION_FAILURE](state, {error, stack = null}) {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
        state.error = error;
        state.stack = stack;
    },
    [types.AUTHENTICATION_SIGNOUT](state) {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
        state.error = null;
        state.stack = null;
    },
    [types.AUTHENTICATION_TOKEN_EXPIRED](state) {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
        state.error = null;
        state.stack = null;
        router.push({name: 'signin'});
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
