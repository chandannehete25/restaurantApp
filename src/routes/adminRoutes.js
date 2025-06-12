const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminCtrl");

router.post("/addCategory", adminCtrl.addCategory);
router.get("/viewCategory", adminCtrl.viewCategories);


module.exports = router;
