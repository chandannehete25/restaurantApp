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
    res.redirect("/tables/view");
  });
};

exports.viewTables = (req, res) => {
  Table.getAllTables((err, data) => {
    if (err) {
      console.error("Error fetching tables:", err);
      return res.status(500).send("Database error");
    }
    res.render("viewtable", { dinning_table: data });
  });
};


exports.showTableEditForm = (req, res) => {
  const id = req.params.id;
  Table.getTableById(id)
    .then((table) => res.render("edittbale", { table, msg: "" }))
    .catch((err) => {
      console.error(err);
      res.send("Error loading edit page");
    });
};


exports.updateTable = (req, res) => {
  const id = req.params.id;
  const { capacity, availability_status } = req.body;

  const tableData = { capacity, availability_status };

  Table.updateTable(id, tableData, (err) => {
    if (err) {
      console.error("Error updating table:", err);
      return res.status(500).send("Error updating table");
    }
    res.redirect("/tables/view");
  });
};

exports.deleteTable = (req, res) => {
  const id = req.params.id;

  Table.deleteTable(id, (err) => {
    if (err) {
      console.error("Error deleting table:", err);
      return res.status(500).send("Error deleting table");
    }
    res.redirect("/tables/view");
  });
};




