const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const courseBodyValidate  = require('../validators/courseValidator');
const validate = require('../validators/validate')

// READ 
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/level/:level', courseController.getCoursesByLevel);

// CREATE
router.post('/', authMiddleware, courseBodyValidate, validate, courseController.createCourse);

// UPDATE
router.put('/:id', authMiddleware, courseBodyValidate, validate, courseController.updateCourse);

// DELETE
router.delete('/:id',authMiddleware, courseController.deleteCourse);

module.exports = router;
