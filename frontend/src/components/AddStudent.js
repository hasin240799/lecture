import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddStudentForm = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/add_student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          level,
          department: selectedDepartment,
          contact,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      alert('Student added successfully');
      setName('');
      setLevel('');
      setSelectedDepartment('');
      setContact('');
      setEmail('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 m-5 container mx-auto max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="name"
          required
        />
      </div>    

      <div className="mb-4">
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Select Course Level</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value="">Select Course Level</option>
          <option value="100L">100 Level</option>
          <option value="200L">200 Level</option>
          <option value="300L">300 Level</option>
          <option value="400L">400 Level</option>
          <option value="500L">500 Level</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="selectedDepartment" className="block text-sm font-medium text-gray-700">Student Department</label>
        <select
          id="selectedDepartment"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          required
        >
          <option value="">Select a department</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="I.T">I.T</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="contact"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="email"
          required
        />
      </div>
      
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;
