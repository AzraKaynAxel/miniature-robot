const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Importation du Middleware
const authMiddleware = require('../middleware/authMiddleware');

// READ
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// CREATE
router.post('/', authMiddleware, categoryController.createCategory);

module.exports = router;