const mysql = require('mysql2')

module.exports = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.SENHA,
    database: process.env.DATABASE
    /*host:'localhost',
    user:'root',
    password:'admin',
    database:'aula_node'*/
  });

