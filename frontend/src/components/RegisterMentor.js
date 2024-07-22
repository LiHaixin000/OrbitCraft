// frontend/src/components/RegisterMentor.js
import React, { useState } from 'react';
import axios from 'axios';
import ExpertiseDropdown from './ExpertiseDropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterMentor = () => {
  const [expertise, setExpertise] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!expertise) {
      toast.error('Please select an expertise');
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/mentorship/mentor`;
      await axios.post(
        url,
        { expertise },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success('Mentor registered successfully');
    } catch (error) {
      console.error('Error registering mentor:', error);
      toast.error('Failed to register mentor');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <ExpertiseDropdown value={expertise} onChange={(e) => setExpertise(e.target.value)} />
        <button type="submit">Register as Mentor</button>
      </form>
    </>
  );
};

export default RegisterMentor;
