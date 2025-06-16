const express = require("express");
const router = express.Router();
const staffCtrl = require("../controllers/staffCtrl.js");

router.get("/add", staffCtrl.showAddForm);               // ✅ /staffs/add
router.post("/add", staffCtrl.addStaff);                 // ✅ /staffs/add

router.get("/view", staffCtrl.viewStaffs);               // ✅ /staffs/view

router.get("/edit/:id", staffCtrl.showEditForm);         // ✅ /staffs/edit/:id
router.post("/update/:id", staffCtrl.updateStaff);       // ✅ /staffs/update/:id

router.get("/delete/:id", staffCtrl.deleteStaff);        // ✅ /staffs/delete/:id

module.exports = router;
