const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);
const Cookies = require('js-cookie');
const router = express.Router();
const { deleteCourse,addCourse,addLecturer,scheduleLecture,createMessage,getAllMessages, getCourses,getStudents,addStudent, addSchedule, getSchedules, getLecturers, deleteStudent } = require('../controllers/lectureController');


const secretKey = '31aa242da19199e28b1fdeba71c5854ef260161064ea176772953f3912d89659013bcb';

const isAuthenticated = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    
    // Attach the decoded user to the request object for further use
    req.user = decoded;
    console.log(req.user.sub)

    // Proceed to the next middleware
    next();
  } catch (error) {
  //   // If token verification fails, return an error response
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// const isAuthenticated = (req) => {
//   return !!req.user;
// };

const isAdmin = async (req, res, next) => {
  try {
    // Check if user is authenticated (JWT payload exists)
    if (req.user && req.user.sub) {
      // Assuming you have a function to find a user by ID
      const user = await User.findByPk(req.user.sub);

      if (!user) {
        // If user does not exist, send forbidden response
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Check if the user is an admin (assuming role is stored in the user object)
      if (user.role === 'admin') {
        return next(); // User is an admin, proceed to next middleware
      }
    }

    // If not an admin or user is not authenticated, send forbidden response
    res.status(403).json({ message: 'Forbidden' });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


router.post('/courses',isAuthenticated,isAdmin,addCourse);
// router.post('/schedules', isAuthenticated, isAdmin, addSchedule);
// router.get('/schedules', isAuthenticated,isAdmin, getSchedules);
router.get('/get_lecturers', isAuthenticated,isAdmin, getLecturers);
router.get('/get_students', isAuthenticated,isAdmin, getStudents);
router.get('/get_courses',isAuthenticated,isAdmin,getCourses);
router.get('/get_schedules',isAuthenticated,isAdmin,getSchedules);
router.post('/add_student',isAuthenticated,isAdmin,addStudent);
router.post('/add_lecturer',isAuthenticated,isAdmin,addLecturer);
router.post('/schedule',isAuthenticated,isAdmin,scheduleLecture);
router.post('/create_message',isAuthenticated,isAdmin,createMessage);
router.get('/get_message',isAuthenticated,isAdmin,getAllMessages);
// Route for deleting a course
router.delete('/delete_courses/:id', deleteCourse);
router.delete('/delete_student/:id', deleteStudent);

module.exports = router;
