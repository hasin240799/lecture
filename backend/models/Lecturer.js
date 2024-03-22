'use strict';
const sequelize = require('../config/database');
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Lecturer extends Model {}

  Lecturer.init({
    lecturer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expertise: {
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
   
  }, {
    sequelize,
    modelName: 'Lecturer',
    timestamps: false,
  });

  return Lecturer;
};
