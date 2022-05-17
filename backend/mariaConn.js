var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '13.209.26.252',
    user :'user',
    password :'1234',
    database:'bi_solution'
});

connection.connect();

module.exports = connection;
