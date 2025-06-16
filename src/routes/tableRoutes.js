const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableCtrl.js");

router.get("/tables/add", tableController.showAddTableForm);

// Route: POST /tables/add
router.post("/tables/add", tableController.addTable);

module.exports = router;
