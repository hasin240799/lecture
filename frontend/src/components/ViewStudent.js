import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewStudents = () => {
  // State to store the list of students
  const [students, setStudents] = useState([]);

  // Function to fetch students from the backend
  const fetchStudents = async () => {
    try {
      const token = Cookies.get('token'); 
      const response = await fetch('http://localhost:5000/api/lectures/get_students',{
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      });

      const data = await response.json();
      setStudents(data.student); // Assuming the students are returned as an array from the backend
      console.log(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // useEffect hook to fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:5000/api/lectures/delete_student/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the students list after successful deletion
        fetchStudents();
      } else {
        console.error('Error deleting student:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-xl font-semibold mb-4">Registered Students</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.user_id}>
              <td className="px-6 py-4 whitespace-nowrap">{student.student_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.level}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.department}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(student.user_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

export default ViewStudents;
