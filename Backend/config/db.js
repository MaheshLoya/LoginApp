const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port : '3309',
  user: 'pooja',
  password: 'pooja@123',
  database: 'userdb',
});

module.exports = db;
