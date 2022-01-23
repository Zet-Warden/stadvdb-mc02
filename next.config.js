const executeQuery = require('./utils/db');

module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        // Will only be available on the server side
        dbQuery: executeQuery,
    },
};
