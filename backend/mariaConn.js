var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "14.49.44.142",
  port: "3308",
  user: "tera_bi",
  password: "tera202206",
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
