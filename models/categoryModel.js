const { DataTypes } = require('sequelize');
const { myDB } = require('../db/sequelize/database');

const Category = myDB.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Category',
    timestamps: true
});

module.exports = Category;