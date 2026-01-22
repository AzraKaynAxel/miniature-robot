const Course = require('./courseModel');
const Category = require('./categoryModel');

// Realtion 1:N between Course and Category
Category.hasMany(Course, {
    foreignKey: 'categoryId',
    as: 'course'
});

// Relation N:1 between Course and Category
Course.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});