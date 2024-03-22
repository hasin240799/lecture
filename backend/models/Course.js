'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Lecturer, {
        foreignKey: 'lecturerId',
        onDelete: 'CASCADE'
      });
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lecturerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lecturer_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      course_level: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      
      credit_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      courseId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
