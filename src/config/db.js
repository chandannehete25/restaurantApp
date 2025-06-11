let mysql = require("mysql2");

let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurantBillingApp",
});

conn.connect((err, result) => {
  if (err) {
    console.log("database not connected");
  } else {
    console.log("Database connected");
  }
});

module.exports = conn;
