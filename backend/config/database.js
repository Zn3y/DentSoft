const mysql = require('mysql2');

const db = mysql.createConnection({
  host:     process.env.MYSQLHOST     || 'localhost',
  port:     parseInt(process.env.MYSQLPORT) || 3306,
  user:     process.env.MYSQLUSER     || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'crm_odontologico'
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
    process.exit(1); // detiene el servidor si no hay DB
  }
  console.log('Conectado a MySQL ✅');
});

module.exports = db;