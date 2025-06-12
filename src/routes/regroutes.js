const express = require("express");
const router = express.Router();
const regCtrl = require("../controllers/regCtrl.js");

router.get("/", regCtrl.regCtrl);
router.get("/",regCtrl.homePage);
router.get("/signup", regCtrl.signUpPage);
router.post("/register", regCtrl.registerUser);
router.get("/signin",regCtrl.signInPage);
router.post("/validate",regCtrl.validateUser);
router.get("/addcat", regCtrl.addCategory);


module.exports = router;
