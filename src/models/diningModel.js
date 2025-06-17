// models/tableModel.js
const db = require('../config/db');          // your mysql / pool module

exports.getAvailable = () =>
  new Promise((resolve, reject) =>
    db.query("SELECT * FROM tables WHERE status='available'", (err, rows) =>
      err ? reject(err) : resolve(rows)
    )
  );

exports.getOccupied = () =>
  new Promise((resolve, reject) =>
    db.query("SELECT * FROM tables WHERE status='occupied'", (err, rows) =>
      err ? reject(err) : resolve(rows)
    )
  );
