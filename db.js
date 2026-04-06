const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'gestionProyectos',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
  } else {
    console.log('Conectado a MySQL');
    conn.release();
  }
});

module.exports = connection;