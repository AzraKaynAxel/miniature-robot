const coursesService = require('../services/coursesService');

const controller = {
    getAllCourses: async (req, res) => {
        try {
            const allCourse = await coursesService.fetchAll();
            
            if (!allCourse) {
                res.status(404).json({message: 'No courses found'}); 
            }

            res.status(200).json(allCourse);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    getCourseById: async (req, res) => {
        try {   
            const myCourse = await coursesService.fetchById(req.params.id);
            
            if (!myCourse) {
                res.status(404).json({message: 'Course with ' + req.params.id + ' not found'}); 
            }

            res.status(200).json(myCourse);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    getCoursesByLevel: async (req, res) => {
        try {
            const coursesByLevel = await coursesService.fetchByLevel(req.params.level);

            if (!coursesByLevel) {
                res.status(404).json({message: 'No courses found for level ' + req.params.level});
            }

            res.status(200).json(coursesByLevel);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    createCourse: async (req, res) => {
        try {

            if (!req.body.title) {
                res.status(400).json({message: 'Please enter valid data for course creation'});
            }

            const newCourse = await coursesService.create(req.body);

            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    updateCourse: async (req, res) => {
        try {
            const myUpdateCourse = await coursesService.update(req.params.id, req.body);

            if (!myUpdateCourse) {
                res.status(400).json({message: 'Not found course to update'});
            }

            res.status(201).json(myUpdateCourse);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    deleteCourse: async (req, res) => {
        try {
            const deletedCourse = await coursesService.delete(req.params.id);
            
            res.status(200).json({message: 'Course deleted successfully', deletedCourse});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

module.exports = controller;