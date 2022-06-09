var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "your ip_address",
  user: "user_id",
  password: "user_password",
  database: "your database",
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
