const { body, param } = require('express-validator');
const Category = require('../models/categoryModel');

const categoryBodyValidate =  [
    body('name')
        .isString().withMessage('Please enter a character string.')
        .customSanitizer(value => String(value).replace(/\s+/g, ''))
        .isLength({min: 3}).withMessage('Must contain min 3 characters.')
        .custom(async (value) => {
            const exist = await Category.findOne({where: {name: value}});
            
            if (exist) {
                throw new Error('This name is aleready exist.')
            }
            return true;
        }),
    body('description').optional()
];

module.exports = categoryBodyValidate;