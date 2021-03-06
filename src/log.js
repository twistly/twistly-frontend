import log from 'loglevel';

// Please only use testLogger when testing
const testLogger = log.getLogger('test').setLevel(log.levels.TRACE);
const generalLogger = log.getLogger('general');

// Each component of our app should have it's own logger
const apiLogger = log.getLogger('api');
const appLogger = log.getLogger('app');
const blogLogger = log.getLogger('blog');

export default generalLogger;

export {
    testLogger,
    generalLogger,
    appLogger,
    apiLogger,
    blogLogger
};
