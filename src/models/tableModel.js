const db = require("../config/db");

exports.insertTable = (tableData, callback) => {
  const { table_id, capacity, availability_status } = tableData;
  const sql = "INSERT INTO dinning_table VALUES ('0',?, ?, ?)";
  db.query(sql, [table_id, capacity, availability_status], callback);
};
