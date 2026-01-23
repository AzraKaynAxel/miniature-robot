const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const categoryBodyValidate  = require('../validators/categoryValidator');
const validate = require('../validators/validate')

// Importation du Middleware
const authMiddleware = require('../middleware/authMiddleware');

// Importation du Middleware
const authMiddleware = require('../middleware/authMiddleware');

// READ
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// CREATE
router.post('/', authMiddleware, categoryBodyValidate, validate, categoryController.createCategory);

module.exports = router;