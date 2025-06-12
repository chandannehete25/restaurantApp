const conn = require("../config/db");

exports.insertCategory = (name) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO category VALUES ('0',?)";
    conn.query(sql, [name], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM category ORDER BY id ASC";
    conn.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
