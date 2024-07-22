// frontend/src/components/RegisterMentee.js
// frontend/src/components/RegisterMentee.js
import React, { useState } from 'react';
import axios from 'axios';
import ExpertiseDropdown from './ExpertiseDropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterMentee = () => {
  const [interest, setInterest] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!interest) {
      toast.error('Please select an interest');
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/mentorship/mentee`;
      await axios.post(
        url,
        { interest },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success('Mentee registered successfully');
    } catch (error) {
      console.error('Error registering mentee:', error);
      toast.error('Failed to register mentee');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <ExpertiseDropdown value={interest} onChange={(e) => setInterest(e.target.value)} />
        <button type="submit">Register as Mentee</button>
      </form>
    </>
  );
};

export default RegisterMentee;

