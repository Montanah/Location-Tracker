// Route for fetching countries from the DB
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.get('/countries', authController.fetchCountries);

module.exports = router;
