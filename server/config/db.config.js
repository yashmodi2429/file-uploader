const mysql = require("mysql");

// Add your database configured MySQL 'password', 'database'
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "XXXXXXX",
    database: "XXXXXXX",
  });

module.exports =  connection;