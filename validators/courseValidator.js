const { body, param } = require('express-validator');
const Course = require('../models/courseModel');
const Category = require('../models/categoryModel');

// Pour pouvoir utiliser les ENUM plus simplement
const LEVELS = Course.getAttributes().level.values;

const courseBodyValidate = [
    body('title')
        .isString().withMessage('Please enter a character string.')
        .customSanitizer(value => value.replace(/\s+/g, ''))
        .isLength({min: 3}).withMessage('Must contain min 3 characters.'),
    body('description')
        .trim().notEmpty().withMessage('The description can\'t be empty')
        .escape() // Contre les attaque XSS
        .isLength({min: 10}).withMessage('Must contain min 10 characters.'),
    body('duration')
        .isInt({min: 1}),
    body('level')
        .exists({ checkFalsy: true }).withMessage('Level is required') // champ obligatoire
        .bail()
        .isIn(LEVELS)
        .withMessage(`This level to be informed must be one of: ${LEVELS.join(', ')}`),
    body('price')
        .exists({ checkFalsy: true }).withMessage('Price is required') // champ obligatoire
        .bail()
        .isFloat({min: 0.00}).withMessage('Price must be a number greater than or equal to 0'),
    body('instructor')
        .exists({ checkFalsy: true }).withMessage('Instructor is required') // champ obligatoire
        .bail(),
    body('categoryId')
        .custom(async (value) => {
            const exist = await Category.findByPk(value);
            
            if (!exist) {
                throw new Error('Please reference an existing category.');
                
            }
        })
];

module.exports = courseBodyValidate;
