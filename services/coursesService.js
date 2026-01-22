const Course = require('../models/courseModel');

const coursesService = {
    fetchAll: async () => {  
        return await Course.findAll();
    },
    fetchById: async (id) => {
        return await Course.findByPk(id);
    },
    fetchByLevel: async (level) => {
        return await Course.findAll({ where: { level: level } });
    },
    createCourse: async (courseData) => {
        let courseIsExist = await Course.findOne({ where: { title: courseData.title } });
        
        if (courseIsExist) {
            throw new Error('Course with name ' + courseData.name + ' already exists')
        };

        return await Course.create(courseData);
    },
    updateCourse: async (id, courseData) => {
        let courseToUpdate = await Course.findByPk(id);

        if (!courseToUpdate) {
            throw new Error('Course with id ' + id + ' not found');
        }

        return await courseToUpdate.update(courseData);
    },
    deleteCourse: async (id) => {
        return await Course.findByPk(id);
    }
};

module.exports = coursesService;