var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "db_server ip_address",
  user: "user_id",
  password: "password",
  database: "database_nm",
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
