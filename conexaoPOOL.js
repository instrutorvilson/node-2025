const mysql = require('mysql2/promise')

module.exports = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.SENHA,
    database: process.env.DATABASE
  });

