import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChalkboardTeacher, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, count, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-sm">
    <div className="flex items-center">
      <div className="mr-4 flex-shrink-0">
        <FontAwesomeIcon icon={icon} className="text-3xl text-gray-500" />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-2xl text-gray-700">{count}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // Assuming these values are obtained from your backend or state
  const totalStudents = 150;
  const totalLecturers = 10;
  const totalSessions = 50;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Students" count={totalStudents} icon={faUser} />
        <Card title="Total Lecturers" count={totalLecturers} icon={faChalkboardTeacher} />
        <Card title="Total Sessions" count={totalSessions} icon={faCalendarAlt} />
      </div>
    </div>
  );
};

export default Dashboard;
