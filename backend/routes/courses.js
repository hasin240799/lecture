// routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET /api/courses
router.get('/', courseController.getAllCourses);

// POST /api/courses
router.post('/', courseController.createCourse);

// Implement other CRUD routes for courses as needed

module.exports = router;
