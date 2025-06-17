// routes/diningRoutes.js
const express = require('express');
const router  = express.Router();
const dining  = require('../controllers/diningCtrl');

router.get('/tables', dining.showTables);   // GET /tables

module.exports = router;
