'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Assuming email should be unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'lecturer', 'admin', 'superadmin'),
      defaultValue: 'user' // Default role for new users
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
