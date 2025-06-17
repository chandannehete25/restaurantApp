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
  const { name, email, contact, username, password, role } = userData;

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO user VALUES ('0', ?, ?, ?, ?, ?, ?)";
    conn.query(sql, [name, email, contact, username, password, role], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
exports.validateUserWithPassword = (userInput, password) => {
  return new Promise((resolve, reject) => {
    let sql = "";
    let params = [];

    if (userInput.includes("@")) {
      sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    } else {
      sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    }

    params = [userInput, password];

    conn.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
