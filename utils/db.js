const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.SCHEMA,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

console.log('connected to database!');

async function executeQuery(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, function (err, rows, fields) {
            if (err) return reject(err);
            resolve([rows, fields]);
        });
    });
}

module.exports = executeQuery;
