import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUserPlus, faUsers, faChalkboardTeacher, faCalendarAlt, faTable } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ user }) {
  const location = useLocation();

  return (
    <div className="bg-gray-900 h-screen p-5 pt-8 w-72">
       <div className="flex items-center">
        <img 
          className="w-10 h-10 rounded-full"
          src={user.avatar} 
          alt="User avatar" 
        />
        <div className="mx-3">
          <h4 className="text-gray-300 font-medium">{user.name}</h4>
          <p className="text-gray-500 text-xs">{user.email}</p>
        </div>
      </div>
      <Link to="/" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faChartBar} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Dashboard</span>
      </Link>

      <Link to="/add_course" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/add_courses" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faUserPlus} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Add Courses</span>
      </Link>

      <Link to="/view_courses" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_courses" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faChalkboardTeacher} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">View Courses</span>
      </Link>

      
      <Link to="/message" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_courses" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faChalkboardTeacher} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Messaging</span>
      </Link>


      <Link to="/add_student" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/add_student" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faUserPlus} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Add Student</span>
      </Link>

      <Link to="/view_student" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_student" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faUsers} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">View Student</span>
      </Link>

      <Link to="/add_lecturer" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/add_lecturer" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faUserPlus} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Add Lecturer</span>
      </Link>

      <Link to="/schedule_lecture" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/schedule_lecture" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faCalendarAlt} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Schedule Lecture</span>
      </Link>

      <Link to="/timetable" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/timetable" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faTable} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">View Time Table</span>
      </Link>
    </div>
  );
}
