'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      courseId: {
        type: Sequelize.STRING
      },
      lecturerId: {
        type: Sequelize.INTEGER
      },
      lecturer_name: {
        type: Sequelize.STRING // New column for lecturer_name
      },
      credit_unit: {
        type: Sequelize.INTEGER // New column for Credit Unit (cu)
      },
      course_level: {
        type: Sequelize.INTEGER // New column for course level
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};
