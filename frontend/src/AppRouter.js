import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginForm';
import RegisterPage from './components/RegistrationForm';
import AddCoursePage from './components/AddCourseForm';
import ViewCourses from './components/ViewCourses';
import AddStudentPage from './pages/addStudent';
import ViewStudents from './components/ViewStudent';
import ScheduleLecturePage from './pages/scheduleLecture';
import AddLecturerPage from './pages/addLecturer';
import TimetablePage from './pages/timeTable';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MessageForm from './components/MessageForm';
import MessagePage from './components/GetMessages';


const AppRouter = () => {
  return (
    <Router>
    <div className="flex">
    <Sidebar 
      user={{
    name: "John Doe",
    email: "john@example.com",
    avatar: ""
  }}
    />
    <div className="p-7 w-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add_course" element={<AddCoursePage />} />
        <Route path="/add_student" element={<AddStudentPage/>} />
        <Route path="/add_lecturer" element={<AddLecturerPage />} />
        <Route path="/view_courses" element={<ViewCourses />} />
        <Route path="/view_student" element={<ViewStudents />} />
        <Route path="/timetable" element={<TimetablePage/>} />
        <Route path="/message" element={<MessageForm/>} />
        <Route path="/messages" element={<MessagePage/>} />
        <Route path="/schedule_lecture" element={<ScheduleLecturePage />} />
      </Routes>
      </div>
    </div>
    </Router>

  );
};

export default AppRouter;
