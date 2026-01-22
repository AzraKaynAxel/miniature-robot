const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// READ 
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/level/:level', courseController.getCoursesByLevel);

// CREATE
router.post('/', courseController.createCourse);

// UPDATE
router.put('/:id', courseController.updateCourse);

// DELETE
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
