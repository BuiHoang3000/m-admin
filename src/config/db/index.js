import mysql from 'mysql2/promise';

console.log('Creating connection...');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'mg_db',
  // password: 'password',
});

export default pool;
