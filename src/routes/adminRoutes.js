const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminCtrl");

router.post("/addCategory", adminCtrl.addCategory);
router.get("/viewCategory", adminCtrl.viewCategories);

// Edit category page
router.get("/editCategory/:id", adminCtrl.editCategoryPage);

// Handle update
router.post("/updateCategory", adminCtrl.updateCategory);

// Handle delete
router.get("/deleteCategory/:id", adminCtrl.deleteCategory);
router.get("/api/Category/search", adminCtrl.searchCategoriesAjax);
router.get("/admin", adminCtrl.dashboard);


module.exports = router;
