import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AddCourseForm = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [creditUnit, setCreditUnit] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await fetch('http://localhost:5000/api/lectures/get_lecturers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLecturers(data.lecturer);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };
    fetchLecturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseTitle,
          courseCode,
          courseLevel,
          creditUnit,
          lecturerId: selectedLecturer,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
      alert('Course added successfully');
      setCourseTitle('');
      setCourseCode('');
      setCourseLevel('');
      setCreditUnit('');
      setSelectedLecturer('');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course');
    }
  };

  return (
    <div className="flex justify-center">
    <form onSubmit={handleSubmit} className="mt-3 mx-5 sm:mx-auto sm:w-full md:w-2/3 lg:w-1/2">
      <div className='container-sm flex-column'>
          <div className="mb-4">
            <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
              id="courseCode"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
              id="courseTitle"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="creditUnit" className="block text-sm font-medium text-gray-700">Select Credit Unit</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
              id="creditUnit"
              value={creditUnit}
              onChange={(e) => setCreditUnit(e.target.value)}
              required
            >
              <option value="">Select Course Credit Unit</option>
              {[1, 2, 3, 4, 5, 6, 7].map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700">Select Course Level</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
              id="courseLevel"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
              required
            >
              <option value="">Select Course Level</option>
              {["100L", "200L", "300L", "400L", "500L"].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="lecturer" className="block  text-sm font-medium text-gray-700">Select Lecturer</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
              id="lecturer"
              value={selectedLecturer}
              onChange={(e) => setSelectedLecturer(e.target.value)}
              required
            >
              <option value="">Select Lecturer</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer.lecturer_id} value={lecturer.lecturer_id}>{lecturer.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Course</button>
          
      </div>
    </form>
    </div>
  );
};

export default AddCourseForm;
