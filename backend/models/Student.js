'use strict';
const sequelize = require('../config/database');
const { Model, DataTypes } = require('sequelize');
const User = require('./User')(sequelize); // Import the User model and pass the Sequelize instance

module.exports = (sequelize) => {
  class Student extends Model {}

  Student.init({
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // Add the user_id field as a foreign key referencing the User table
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Student',
    timestamps: false
  });

  return Student;
};
