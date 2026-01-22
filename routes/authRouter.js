const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.SingIn);
router.post('/login', authController.SingUp);


module.exports = router;