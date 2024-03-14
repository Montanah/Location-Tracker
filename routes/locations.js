// Add & Display locations routes
const express = require('express');
const router = express.Router();
const locationController = require('../controller/locations');
const auth = require('../middleware/auth');

// Add locations route
router.post('/addLocation', auth, locationController.addLocation);

// Display locations route
router.get('/displayLocations', auth, locationController.displayLocations);

module.exports = router;