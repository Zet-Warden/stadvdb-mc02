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
    const conn = await pool1.getConnection();

    try {
        await conn.query('start transaction;');
        var result = await conn.query(query);
        await conn.query('commit;');
        conn.release();

        return result;
    } catch (err) {
        await conn.query('rollback;');
        console.log(err);
    }

    /* return new Promise((resolve, reject) => {
        pool1.query(query, function (err, rows, fields) {
            if (err) return reject(err);
            resolve([rows, fields]);
        });
    }); */
}

module.exports = executeQuery;
