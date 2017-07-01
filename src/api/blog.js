import api from './api';

const getBlogs = () => {
    return new Promise((resolve, reject) => {
        api.get('blog').then(({data}) => {
            resolve({blogs: data.blogs});
        }).catch(error => {
            if (error.response.status === 404) {
                return resolve({blogs: []});
            }
            reject(error);
        });
    });
};

export default {
    getBlogs
};
