import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddLecturerForm = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:5000/api/lectures/add_lecturer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          expertise,
          department: selectedDepartment,
          contact,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      alert('Lecturer Name added successfully');
      setName('');
      setExpertise('');
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Lecturer Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          id="name"
          required
        />
      </div>    

      <div className='mb-4'>
      <label htmlFor="selectedDepartment" className="block text-sm font-medium text-gray-700">Lecturer Course</label>
      <select
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 block w-full"
        id="expertise"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
        required
        >
        <option value="">Select Expertise</option>
        <option value="Algorithms and Data Structures">Algorithms and Data Structures</option>
        <option value="Database Systems">Database Systems</option>
        <option value="Computer Networks">Computer Networks</option>
        <option value="Operating Systems">Operating Systems</option>
        <option value="Machine Learning">Machine Learning</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
        <option value="Computer Graphics">Computer Graphics</option>
        <option value="Software Engineering Methodologies">Software Engineering Methodologies</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Web Development">Web Development</option>
        <option value="Mobile App Development">Mobile App Development</option>
        <option value="Cloud Computing">Cloud Computing</option>
        <option value="Big Data Analytics">Big Data Analytics</option>
    </select>
    </div>


      <div className="mb-4">
        <label htmlFor="selectedDepartment" className="block text-sm font-medium text-gray-700">Lecturer Name Department</label>
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
        Add Lecturer Name
      </button>
    </form>
  );
};

export default AddLecturerForm;
