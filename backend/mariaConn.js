var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "***.***.***.***",
  user: "userID",
  password: "userPassword",
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
