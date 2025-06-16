const Table = require("../models/tableModel");

exports.showAddTableForm = (req, res) => {
  res.render("addtable"); // EJS view
};

exports.addTable = (req, res) => {
  const { table_id, capacity, availability_status } = req.body;

  Table.insertTable({ table_id, capacity, availability_status }, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Database error.");
    }
    res.redirect("/viewtables");
  });
};
