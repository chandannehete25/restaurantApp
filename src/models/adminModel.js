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

exports.getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM category WHERE id = ?";
      conn.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  };

  exports.updateCategoryById = (id, name) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE category SET name = ? WHERE id = ?";
      conn.query(sql, [name, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  exports.deleteCategoryById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM category WHERE id = ?";
      conn.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
//   exports.searchCategories = (searchTerm) => {
//     return new Promise((resolve, reject) => {
//       const sql = "SELECT * FROM category WHERE name LIKE ? ORDER BY id ASC";
//       conn.query(sql, [`%${searchTerm}%`], (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       });
//     });
//   };
exports.searchCategories = (search) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM category WHERE name LIKE ? ORDER BY id ASC";
      conn.query(sql, [`%${search}%`], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
  