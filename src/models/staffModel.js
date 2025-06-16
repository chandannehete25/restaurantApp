const conn = require("../config/db");

exports.insertStaff = (data) => {
  const sql = `INSERT INTO staff (name, email, contact_no, salary) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [data.name, data.email, data.contact_no, data.salary], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getAllStaffs = (search) => {
  const sql = `
    SELECT * FROM staff 
    WHERE name LIKE ? OR email LIKE ? OR contact_no LIKE ?
  `;
  const keyword = `%${search}%`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [keyword, keyword, keyword], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getStaffById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM staff WHERE staff_id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

exports.updateStaff = (id, data) => {
  const sql = `UPDATE staff SET name = ?, email = ?, contact_no = ?, salary = ? WHERE staff_id = ?`;
  return new Promise((resolve, reject) => {
    conn.query(sql, [data.name, data.email, data.contact_no, data.salary, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.deleteStaff = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM staff WHERE staff_id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
