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

async function executeQuery(query) {
    // var result = [];
    // const conn = await pool2.getConnection();
    // await conn.query('start transaction;');
    // const result = await conn.query(query);
    // await conn.query('commit');
    // console.log(result[0]);
    // return result;

    let result1 = [];
    let result2 = [];
    let result3 = [];
    let data;

    try {
        const conn1 = await pool1.getConnection();
        await conn1.query('start transaction;');
        data = await conn1.query(query);
        await conn1.query('commit;');
        conn1.release();
        result1 = result1.concat(data);

        return [result1[0]];
    } catch (err) {
        console.log('NODE 1 ERROR:');
        console.log(err);

        try {
            const conn2 = await pool2.getConnection();
            await conn2.query('start transaction;');
            data = await conn2.query(query);
            await conn2.query('commit;');
            conn2.release();
            result2 = result2.concat(data);
        } catch (err) {
            console.log('NODE 2 ERROR: ');
            console.log(err);
        }

        try {
            const conn3 = await pool3.getConnection();
            await conn3.query('start transaction;');
            data = await conn3.query(query);
            await conn3.query('commit;');
            conn3.release();
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

module.exports = executeQuery;
