const executeQuery = require('./utils/db');

module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        // Will only be available on the server side
        dbQuery: executeQuery,
    },
    images: {
        domains: ['m.media-amazon.com'],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
