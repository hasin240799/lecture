import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewCourses = () => {
  // State to store the list of courses
  const [courses, setCourses] = useState([]);

  // Function to fetch courses from the backend
  const fetchCourses = async () => {
    try {
      const token = Cookies.get('token'); 
      const response = await fetch('http://localhost:5000/api/lectures/get_courses',{
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      });

      const data = await response.json();
      setCourses(data.courses); // Assuming the courses are returned as an array from the backend
      console.log(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // useEffect hook to fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:5000/api/lectures/delete_courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the courses list after successful deletion
        fetchCourses();
      } else {
        console.error('Error deleting course:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-xl font-semibold mb-4">Added Courses</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="px-6 py-4 whitespace-nowrap">{course.courseId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{course.lecturer_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(course.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourses;
