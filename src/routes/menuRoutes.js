const express = require("express");
const router = express.Router();
const menuCtrl = require("../controllers/menuCtrl");
const upload = require("../middlewares/upload");

router.get("/add", menuCtrl.addMenuPage);
router.post("/add", upload.single("image"), menuCtrl.addMenu);
router.get("/view", menuCtrl.viewMenus);
router.get("/edit/:id", menuCtrl.editMenuPage);
router.post("/update/:id", upload.single("image"), menuCtrl.updateMenu);
router.get("/delete/:id", menuCtrl.deleteMenu);
router.get("/search", menuCtrl.searchMenusAjax);
module.exports = router;
