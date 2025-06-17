const express = require("express");
const router = express.Router();
const staffCtrl = require("../controllers/staffCtrl.js");

router.get("/add", staffCtrl.showAddForm);              
router.post("/add", staffCtrl.addStaff);                 

router.get("/view", staffCtrl.viewStaffs);              

router.get("/edit/:id", staffCtrl.showEditForm);        
router.post("/update/:id", staffCtrl.updateStaff);      

router.get("/delete/:id", staffCtrl.deleteStaff);       

module.exports = router;
