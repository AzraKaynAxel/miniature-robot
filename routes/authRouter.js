const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidate, loginValidate } = require('../validators/authValidator');
const validate = require('../validators/validate')

router.post('/register',registerValidate(), validate, authController.SingIn);
router.post('/login', loginValidate(), validate, authController.SingUp);


module.exports = router;