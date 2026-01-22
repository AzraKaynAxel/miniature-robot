const { DataTypes } = require('sequelize');
const { myDB } = require('../db/sequelize/database');

const Course = myDB.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Course',
    timestamps: true
});

module.exports = Course;