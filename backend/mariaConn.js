var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "your ip_address",
  user: "your user_id",
  password: "user password",
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
