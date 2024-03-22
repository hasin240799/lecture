const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



const { register, login, protectedRoute} = require('../controllers/authController');

// // Register route
// router.post('/register', registerUser);
// // Login user
// router.post('/login',loginUser );
  
// Register a new user
router.post('/register',register);
  
  // // Login user
router.post('/login', login);
  



// // Define routes
// router.post('/login', loginHandler);
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedRoute);

// Export the router
module.exports = router;
