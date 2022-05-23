var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "{ip_address}",
  user: "user_id",
  password: "password",
  database: "your_database",
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
