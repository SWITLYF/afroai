const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_db'
});
connection.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});
module.exports = connection;