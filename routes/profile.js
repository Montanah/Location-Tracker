// Route for fetching user profile
const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile');
const auth = require('../middleware/auth');

// Fetch user profile
router.get('/profile', auth, profileController.fetchUserProfile);

module.exports = router;