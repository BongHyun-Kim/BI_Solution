var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "15.164.213.27",
  user: "user",
  password: "1234",
  database: "bi_solution",
});

// Connect
connection.connect(function (err) {
  if (err) {
    console.error("mariadb connection error");
    console.error(err);
    throw err;
  }
});

module.exports = connection;
