const { body, param } = require('express-validator');
const User = require('../models/userModel');

const registerValidate = () => {
    return [
        body('username')
            .isString().withMessage('Please enter a character string.')
            .customSanitizer(value => value.replace(/\s+/g, ''))
            .isLength({min: 3}).withMessage('Must contain min 3 characters.')
            .custom(async (username) => {
                const exist = await User.findOne({ where: {username}});
                
                console.log(exist);

                if (exist) {
                    throw new Error('This name is aleready exist.')
                }

                console.log("jesui passée");
                
                return true;
            }),
        body('email')
            .isEmail().withMessage('Please enter email valid')
            .normalizeEmail(), // convertir l'email (ex: ExEmple@my.com -> exemple@my.com)
        body('password')
            .isLength({ min: 6 }).withMessage('Your password must contain at least 6 characters.'),  
        //body('')
    ];
}

const loginValidate = () => {
    return [
        body('email').isEmail().withMessage('Please enter email valid'),
        body('password').notEmpty().withMessage('Password is required'),
    ];
}

module.exports = { registerValidate, loginValidate };

//role : doit être , "instructor" ou "admin"