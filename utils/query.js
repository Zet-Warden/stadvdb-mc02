import getConfig from 'next/config';
const {
    serverRuntimeConfig: { dbQuery: query },
} = getConfig();

export default query;
