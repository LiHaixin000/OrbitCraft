// frontend/src/components/RegisterMentee.js
// frontend/src/components/RegisterMentee.js
import React, { useState } from 'react';
import axios from 'axios';
import ExpertiseDropdown from './ExpertiseDropdown';

const RegisterMentee = () => {
  const [interest, setInterest] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Assuming username is stored in local storage

    try {
      await axios.post(
        'http://localhost:5001/api/mentorship/mentee',
        { username, interest },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Mentee registered successfully');
    } catch (error) {
      console.error('Error registering mentee:', error);
      alert('Failed to register mentee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ExpertiseDropdown value={interest} onChange={(e) => setInterest(e.target.value)} />
      <button type="submit">Register as Mentee</button>
    </form>
  );
};

export default RegisterMentee;
