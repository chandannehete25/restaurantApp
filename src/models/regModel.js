let conn = require("../config/db.js"); // your MySQL connection

// exports.insertUser = (userData) => {
//   const { name, email, contact, username, password } = userData;

//   return new Promise((resolve, reject) => {
//     const sql = "INSERT INTO user (name, email, contact, username, password) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [name, email, contact, username, password], (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// };

exports.insertUser = (userData) => {
  const { name, email, contact, username, password } = userData;

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO user VALUES ('0',?, ?, ?, ?, ?)";
    conn.query(sql, [name, email, contact, username, password], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
exports.validateUserWithPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    conn.query(sql, [username, password], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
