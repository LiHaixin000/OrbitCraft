// frontend/src/components/RegisterMentor.js
import React, { useState } from 'react';
import axios from 'axios';
import ExpertiseDropdown from './ExpertiseDropdown';

const RegisterMentor = () => {
  const [expertise, setExpertise] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5001/api/mentorship/mentor',
        { expertise },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Mentor registered successfully');
    } catch (error) {
      console.error('Error registering mentor:', error);
      alert('Failed to register mentor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ExpertiseDropdown value={expertise} onChange={(e) => setExpertise(e.target.value)} />
      <button type="submit">Register as Mentor</button>
    </form>
  );
};

export default RegisterMentor;
