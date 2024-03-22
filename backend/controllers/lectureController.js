const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);
const Course = require('../models/Course')(sequelize); // Initialize Course model with sequelize instance
const Student = require('../models/Student')(sequelize); // Initialize Course model with sequelize instance
const Schedule = require('../models/Schedule')(sequelize); // Initialize Course model with sequelize instance
const Lecturer = require('../models/Lecturer')(sequelize); // Initialize Course model with sequelize instance
const Message = require('../models/Message')(sequelize); // Initialize Course model with sequelize instance
const bcrypt = require('bcrypt');





// Method to create a new message
exports.createMessage = async function(req, res) {
  try {
    const { message } = req.body;
    // Get the user ID from the request
    const userId = req.user.sub;
    // Ensure that userId is defined
    if (!userId) {
      return res.status(400).json({ message: 'User ID is not provided' });
    }
    // Find the student by user ID
    const student = await Student.findOne({ where: { user_id: userId } });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Extract sender name from the student
    const sender = student.name;
    // Create a new message
    const newMessage = await Message.create({ sender, message });
    // Send the newly created message as a response
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Method to get all messages
exports.getAllMessages = async function(req, res) {
  try {
    // Fetch all messages from the database
    const messages = await Message.findAll();
    // Send the messages as a response
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Method to get a single message by ID
exports.getMessageById = async function(req, res) {
  const { id } = req.params;
  try {
    // Find the message by ID in the database
    const message = await Message.findByPk(id);
    // If the message is not found, return a 404 response
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    // Send the message as a response
    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Method to delete a message by ID
exports.deleteMessage = async function(req, res) {
  const { id } = req.params;
  try {
    // Find the message by ID in the database
    const message = await Message.findByPk(id);
    // If the message is not found, return a 404 response
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    // Delete the message from the database
    await message.destroy();
    // Send a success response
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


exports.addCourse = async (req, res) => {
  try {
    const { courseTitle,courseCode,lecturerId,LecturerName,courseLevel, creditUnit } = req.body;
    const user = await User.findOne({ where: { id:lecturerId } });
    const course = await Course.create({ 
      title: courseTitle,
      courseId: courseCode,
      lecturerId:lecturerId,
      lecturer_name:user.username,
      credit_unit:creditUnit,
      course_level:courseLevel
    });

    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.addStudent = async (req, res) => {
  try {
    const { name, level, department, contact, email } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const hashedPassword = bcrypt.hashSync(contact, 10);
    const newUser = await User.create({ username:email,email:email, password: hashedPassword });

    const student = await Student.create({ 
      name: name,
      level: level,
      department: department,
      contact: contact,
      email: email,
      'user_id':newUser.id,
    });

    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addLecturer = async (req, res) => {
  try {
    const { name, expertise, department, contact, email } = req.body;
    // Check if the user already exists
    const existingUser = await Lecturer.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Lecturer already exists' });
    }
 
    const lecturer = await Lecturer.create({ 
      name: name,
      expertise:expertise,
      department: department,
      contact: contact,
      email: email,
    });

    res.status(201).json({ message: 'Lecturer added successfully', lecturer });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// // Controller function to schedule a new lecture
// exports.scheduleLecture = async (req, res) => {
//   try {
//     const {
//       course_code,
//       schedule_date,
//       start_time,
//       end_time
//     } = req.body;

//     // Create a new lecture instance
//     const newLecture = new Lecture({
      // lecture_name,
      // lecturer_id,
      // course_level,
      // course_id,
      // course_title,
//       course_code,
//       schedule_date,
//       start_time,
//       end_time
//     });

//     // Save the new lecture to the database
//     await newLecture.save();

//     res.status(201).json({ message: 'Lecture scheduled successfully', lecture: newLecture });
//   } catch (error) {
//     console.error('Error scheduling lecture:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Controller function to schedule a new lecture
exports.scheduleLecture = async (req, res) => {
  try {
    const {
      lecture_name,
      lecturer_id,
      course_level,
      course_id,
      course_title,
      courseId,
      scheduleDate,
      startTime,
      endTime
    } = req.body;

    const course = await Course.findOne({
      where: { id: courseId } // Specify conditions in the where clause
    });

    const newLecture = await Schedule.create({
      course_id: courseId,
      course_code:course.courseId,
      lecture_name:course.lecturer_name,
      lecturer_id:course.lecturerId,
      course_title:course.title,
      course_level:course.course_level,
      schedule_date: scheduleDate,
      start_time: startTime,
      end_time: endTime
    });

    res.status(201).json({ message: 'Lecture scheduled successfully', lecture: newLecture });
  } catch (error) {
    console.error('Error scheduling lecture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json({ schedules });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function for deleting a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    // Assume Course is your model
  
    const deletedCourse = await Course.destroy({
      where: {
         id: id,
      },
   });
    
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function for deleting a course
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    // Assume Course is your model
  
    const deletedStudent = await User.destroy({
      where: {
         id: id,
      },
   });
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getStudents = async (req, res) => {
  try {
    const student = await Student.findAll();
    res.status(200).json({ student });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getLecturers = async (req, res) => {
  try {
    const lecturer = await Lecturer.findAll();
    res.status(200).json({ lecturer });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// exports.addSchedule = async (req, res) => {
//   try {
//     const { courseId, date, time, topic } = req.body;
//     const schedule = await Schedule.create({ courseId, date, time, topic });
//     res.status(201).json({ message: 'Schedule added successfully', schedule });
//   } catch (error) {
//     console.error('Error adding schedule:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// exports.getSchedules = async (req, res) => {
//   try {
//     const schedules = await Schedule.findAll();
//     res.status(200).json({ schedules });
//   } catch (error) {
//     console.error('Error fetching schedules:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
