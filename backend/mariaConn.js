var mysql = require("mysql");

//  Connection 객체 생성
var connection = mysql.createConnection({
  host: "ur_ip_addr",
  user: "ur_user_name",
  password: "ur_password",
  database: "ur_database",
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
