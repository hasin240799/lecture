'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define Lectures model
const Lectures = sequelize.define('Lectures', {
  lecture_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lecturer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lecture_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Other lecture attributes
});

// Export the Lectures model
module.exports = Lectures;
