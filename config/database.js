import mysql from "mysql2";
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    database: 'bookbyte',
    user: 'root',
    password: 'admin123'
});
export default pool;