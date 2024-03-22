const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// authController.js
const secretORKey = '31aa242da19199e28b1fdeba71c5854ef260161064ea176772953f3912d89659013bcb';
// Function to generate a unique secret key
function generateUniqueSecretKey() {
  // Generate a random string or use a unique identifier like UUID
  // For demonstration purposes, let's generate a random string of 32 characters
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let secretKey = '';
  for (let i = 0; i < 32; i++) {
    secretKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return secretKey;
}
// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ where: { email } });
    // Check if user exists and password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate JWT token
      console.log(user.id)
      const token = jwt.sign({ sub: user.id }, secretORKey, { expiresIn: '1h' });
      // Return token to client
      res.json({ token });
      console.log(req.user)
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Registration function
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a unique secret key for the user
    const secretKey = generateUniqueSecretKey();

    // Create a new user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, secretKey });

    // Generate JWT token for the new user
    const token = jwt.sign({ sub: newUser.id, secretKey }, secretORKey, { expiresIn: '1h' });
    console.log(secretKey)

    // Return token to client
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Protected route function
exports.protectedRoute = (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
};

