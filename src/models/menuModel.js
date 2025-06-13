const conn = require("../config/db");

exports.insertMenu = (data) => {
  const sql = `INSERT INTO menu (item_name, category_id, price, description, image)
               VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [data.item_name, data.category_id, data.price, data.description, data.image], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM category", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getMenus = (search) => {
  let sql = `
    SELECT m.id, m.item_name, c.name as category, m.price, m.description
    FROM menu m
    JOIN category c ON m.category_id = c.id
    WHERE m.item_name LIKE ? OR c.name LIKE ? OR m.description LIKE ?
  `;
  const keyword = `%${search}%`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [keyword, keyword, keyword], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Get Menu By ID
exports.getMenuById = (id) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM menu WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  };
  
  // Update Menu
  exports.updateMenu = (id, data) => {
    const sql = `UPDATE menu SET item_name = ?, category_id = ?, price = ?, description = ?, image = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      conn.query(sql, [data.item_name, data.category_id, data.price, data.description, data.image, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
  
  // Delete Menu
  exports.deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM menu WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };