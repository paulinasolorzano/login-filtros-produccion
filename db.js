const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'gestionProyectos',
  port: process.env.MYSQLPORT || 3306
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
  } else {
    console.log('Conectado a MySQL');
  }
});

module.exports = connection;