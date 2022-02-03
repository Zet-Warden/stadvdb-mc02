const mysql = require('mysql2');
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
    return new Promise((resolve, reject) => {
        pool2.query(query, function (err, rows, fields) {
            if (err) return reject(err);
            resolve([rows, fields]);
        });
    });
}

(async function () {
    const data = await executeQuery('select * from movie_change_events;');
    console.log(data[0][0].event_timestamp);
    console.log(new Date(data[0][0].event_timestamp).getTime());
    console.log(new Date(data[0][1].event_timestamp).getTime());
    console.log(new Date(data[0][2].event_timestamp).getTime());
    console.log(new Date(data[0][3].event_timestamp).getTime());
})();

module.exports = executeQuery;
