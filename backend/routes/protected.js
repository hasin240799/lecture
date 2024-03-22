// routes/protected.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Protected route example
router.get('/profile', authenticate, (req, res) => {
  res.send('Welcome to your profile');
});

module.exports = router;
