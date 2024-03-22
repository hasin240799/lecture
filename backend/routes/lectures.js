// routes/lectures.js
const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');

// GET /api/lectures
router.get('/', lectureController.getAllLectures);

// POST /api/lectures
router.post('/', lectureController.scheduleLecture);

// Implement other CRUD routes for lectures as needed

module.exports = router;
