const db = require("../config/db"); // your MySQL connection

exports.insertUser = (userData) => {
  const { name, email, contact, username, password } = userData;

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO user (name, email, contact, username, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, contact, username, password], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
