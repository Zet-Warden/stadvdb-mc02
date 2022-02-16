const mysql = require('mysql2/promise');
const DB_CONFIG = {
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.SCHEMA,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

const pool1 = mysql.createPool({
    host: process.env.DB_URL1,
    ...DB_CONFIG,
});

const pool2 = mysql.createPool({
    host: process.env.DB_URL2,
    ...DB_CONFIG,
});

const pool3 = mysql.createPool({
    host: process.env.DB_URL3,
    ...DB_CONFIG,
});

console.log('connected to database!');

async function query(query) {
    let result1 = [];
    let result2 = [];
    let result3 = [];
    let data;

    try {
        data = await executeQuery('NODE 1', query);
        result1 = result1.concat(data);
        return [result1[0]];
    } catch (err) {
        console.log('NODE 1 ERROR:');
        console.log(err);

        try {
            data = await executeQuery('NODE 2', query);
            result2 = result2.concat(data);
        } catch (err) {
            console.log('NODE 2 ERROR: ');
            console.log(err);
        }

        try {
            data = await executeQuery('NODE 3', query);
            result3 = result3.concat(data);
        } catch (err) {
            console.log('NODE 3 ERROR: ');
            console.log(err);
        }
    }

    return [
        [...(result2[0] ? result2[0] : []), ...(result3[0] ? result3[0] : [])],
    ];
}

async function insertQuery(query, { year }) {
    try {
        await executeQuery('NODE 1', query);
    } catch (err) {
        console.log('NODE 1 ERROR:');
        console.log(err);

        if (year < 1980) {
            console.log('EXECUTING IN NODE 2');
            try {
                await executeQuery('NODE 2', query);
            } catch (err) {
                console.log('NODE 2 ERROR: ');
                console.log(err);
                console.log('EXECUTING IN NODE 3');

                try {
                    await executeQuery('NODE 3', query);
                } catch (err) {
                    console.log('NODE 3 error');
                    console.log(err);
                }
            }
        } else {
            console.log('EXECUTING IN NODE 3');
            try {
                await executeQuery('NODE 3', query);
            } catch (err) {
                console.log('NODE 3 ERROR: ');
                console.log(err);
                console.log('EXECUTING IN NODE 2');

                try {
                    await executeQuery('NODE 2', query);
                } catch (err) {
                    console.log('NODE 2 error');
                    console.log(err);
                }
            }
        }
    }
}

async function executeQuery(node, query) {
    const conn = await getNodeConnection(node);

    try {
        await conn.query('start transaction;');
        const data = await conn.query(query);
        // await conn.query('select sleep(69);');
        await conn.query('commit;');
        conn.release();
        return [data[0]];
    } catch (err) {
        if (err.errno === 1205) {
            //lock time out error
            return await executeQuery(node, query);
        } else {
            throw err;
        }
    }
}

async function getNodeConnection(node) {
    switch (node) {
        case 'NODE 1':
            return await pool1.getConnection();
        case 'NODE 2':
            return await pool2.getConnection();
        case 'NODE 3':
            return await pool3.getConnection();
        default:
            throw `Node: ${node} specified cannot be identified. `;
    }
}

module.exports = { query, insertQuery };
