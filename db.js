const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'gestionProyectos',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error conectando a MySQL COMPLETO:', err);
    console.error('MYSQLHOST:', process.env.MYSQLHOST);
    console.error('MYSQLUSER:', process.env.MYSQLUSER);
    console.error('MYSQLDATABASE:', process.env.MYSQLDATABASE);
    console.error('DB_NAME:', process.env.DB_NAME);
    console.error('MYSQLPORT:', process.env.MYSQLPORT);
  } else {
    console.log('Conectado a MySQL');
    conn.release();
  }
});

module.exports = pool;