const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableCtrl.js");

// Show Add Table Form
router.get("/tables/add", tableController.showAddTableForm);

// Handle Table Addition
router.post("/tables/add", tableController.addTable);

// View All Tables
router.get("/tables/view", tableController.viewTables);

// Show Edit Table Form by ID
router.get('/tables/viewtable/:id', tableController.showTableEditForm);

// ✅ Handle Table Update (This was missing)
router.post('/tables/update/:id', tableController.updateTable);
router.post("/tables/update/:id", tableController.updateTable);
// Handle delete table by ID
router.get("/tables/delete/:id", tableController.deleteTable);





module.exports = router;
