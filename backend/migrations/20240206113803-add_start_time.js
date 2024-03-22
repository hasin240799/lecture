'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      lecturerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Lectures',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      // Add other columns as needed
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add composite unique constraint for courseId and lecturerId
    await queryInterface.addConstraint('Schedules', {
      type: 'unique',
      fields: ['courseId', 'lecturerId'],
      name: 'unique_course_lecturer'
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Drop the composite unique constraint first
    await queryInterface.removeConstraint('Schedules', 'unique_course_lecturer');

    // Then drop the table
    await queryInterface.dropTable('Schedules');
  }
};
