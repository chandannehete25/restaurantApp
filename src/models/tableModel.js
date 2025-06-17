const db = require("../config/db");

// Insert a new table
exports.insertTable = (tableData, callback) => {
  const { table_id, capacity, availability_status } = tableData;
  const sql = "INSERT INTO dinning_table (table_id, capacity, availability_status) VALUES (?, ?, ?)";
  db.query(sql, [table_id, capacity, availability_status], callback);
};

// Get all tables
exports.getAllTables = (callback) => {
  const sql = "SELECT * FROM dinning_table ORDER BY table_id ASC"; // fix typo here too
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get a table by ID
exports.getTableById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM dinning_table WHERE table_id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// Update a table
exports.updateTable = (id, tableData, callback) => {
  // const sql = "UPDATE dining_table SET capacity = ?, availability_status = ? WHERE table_id = ?";
     const sql = "UPDATE dinning_table SET capacity = ?, availability_status = ? WHERE table_id = ?";

  const values = [tableData.capacity, tableData.availability_status, id];
  db.query(sql, values, callback);
};

exports.deleteTable = (id, callback) => {
  const sql = "DELETE FROM dinning_table WHERE table_id = ?";
  db.query(sql, [id], callback);
};



