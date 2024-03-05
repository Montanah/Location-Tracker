const express = require('express');

const router = express.Router();
const authController = require('../controller/auth');
router.get('/', (req, res) =>{
    res.render('index');
});

router.get('/register', authController.register);




module.exports = router;