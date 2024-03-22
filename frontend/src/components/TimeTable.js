import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const TimeTable = () => {
  // Initialize state to hold timetable data
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    // Fetch timetable data from the backend API
    const fetchTimetableData = async () => {  
      try {
        const token = Cookies.get('token');
        const response = await fetch('http://localhost:5000/api/lectures/get_schedules', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch Time Table');
        }
        const data = await response.json();
        setTimetableData(data.schedules); // Assuming data is an array of Time Table with { id, title }
      } catch (error) {
        console.error('Error fetching Time Table:', error);
      }
    };

    fetchTimetableData(); // Call the fetchTimetableData function
  }, []); // Empty dependency array ensures fetchTimetableData is only called once on component mount

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Lecture Timetable</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Lecture Name</th>
            <th className="border border-gray-300 px-4 py-2">Course Level</th>
            <th className="border border-gray-300 px-4 py-2">Schedule Date</th>
            <th className="border border-gray-300 px-4 py-2">Start Time</th>
            <th className="border border-gray-300 px-4 py-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {timetableData.map((schedule) => (
            <tr key={schedule.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{schedule.id}</td>
              <td className="border border-gray-300 px-4 py-2">{schedule.lecture_name}</td>
              <td className="border border-gray-300 px-4 py-2">{schedule.course_level}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(schedule.schedule_date).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{schedule.start_time}</td>
              <td className="border border-gray-300 px-4 py-2">{schedule.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
