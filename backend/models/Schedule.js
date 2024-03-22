'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import the User model

module.exports = (sequelize) => {
  class Schedule extends Model {}

  // Define the Schedule model
  Schedule.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lecture_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lecturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    course_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    schedule_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
    // Other schedule attributes
  }, {
    sequelize,
    modelName: 'Schedule',
    timestamps: false
  });

  return Schedule;
};
