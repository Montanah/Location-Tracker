// Add & Display locations routes
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');;
const auth = require('../middleware/auth');

// Add locations route
router.post('/addLocation', authController.addLocation);

// Display locations route
router.get('/displayLocations', authController.displayLocations);

module.exports = router;