const mysql = require('mysql2'); // <--- antes era 'mysql'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña
  database: 'crm_odontologico'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = db;
