// Route for fetching user profile
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

// Fetch user profile
router.get('/profile', authController.fetchUserProfile);

module.exports = router;