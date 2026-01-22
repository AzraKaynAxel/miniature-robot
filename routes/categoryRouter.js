const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// READ
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// CREATE
router.post('/', categoryController.createCategory);

module.exports = router;