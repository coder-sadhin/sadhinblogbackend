const mysql = require('mysql');

const DbPool = mysql.createPool({
    user: 'root',
    host: process.env.DB_Host,
    port: process.env.DB_Port,
    password: process.env.DB_Pass,
    database: process.env.DB_Name,
});
try {
    DbPool.getConnection((err, connection) => {
        if (err) throw err;
        if (connection) {
            console.log("Database Connected Successfully");
        }
    });
} catch (error) {
    console.log(error)
}

module.exports = DbPool;