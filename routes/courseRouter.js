const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// READ 
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/level/:level', courseController.getCoursesByLevel);

// CREATE
router.post('/', authMiddleware, courseController.createCourse);

// UPDATE
router.put('/:id', authMiddleware, courseController.updateCourse);

// DELETE
router.delete('/:id',authMiddleware, courseController.deleteCourse);

module.exports = router;
