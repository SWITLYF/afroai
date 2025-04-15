const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aeady',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

module.exports = connection;
