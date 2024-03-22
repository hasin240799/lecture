import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ScheduleLectureForm = () => {
  const [formData, setFormData] = useState({
    courseId: '', // Updated to courseId for course selection
    scheduleDate: '',
    startTime: '',
    endTime: ''
  });

  const [courses, setCourses] = useState([]);

  // Declare the fetchCourses function before using it in useEffect
  const fetchCourses = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/get_courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data.courses); // Assuming data is an array of courses with { id, title }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); // Empty dependency array ensures fetchCourses is only called once on component mount

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = Cookies.get('token'); // Get the JWT token from cookies
  
      // Prepare the data to be sent
      const dataToSend = {
        courseId: formData.courseId,
        scheduleDate: formData.scheduleDate,
        startTime: formData.startTime,
        endTime: formData.endTime
      };
  
      // Send the data to the backend
      const response = await fetch('http://localhost:5000/api/lectures/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to schedule lecture');
      }
  
      // Reset the form data after successful submission
      setFormData({
        courseId: '',
        scheduleDate: '',
        startTime: '',
        endTime: ''
      });
  
      // Optionally, you can display a success message or perform other actions upon successful submission
      alert('Lecture scheduled successfully');
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can display an error message or perform other actions upon error
      alert('Error scheduling lecture');
    }
  };
  
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule Lecture</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Select Course</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700">Schedule Date</label>
          <input type="date" id="scheduleDate" name="scheduleDate" value={formData.scheduleDate} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
          <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Schedule Lecture</button>
      </form>
    </div>
  );
};

export default ScheduleLectureForm;
