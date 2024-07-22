// frontend/src/components/ProfilePopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfilePopup.css';

const ProfilePopup = ({ username, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        console.log(`Fetching profile for: ${username}`);
        const url = `${process.env.REACT_APP_API_BASE_URL}/api/mentorship/profile/${username}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
        console.log('Profile fetched:', response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleSendMessage = async () => {
    if (!currentUser || !currentUser.username) {
      console.error('Current user is not defined');
      alert('You must be logged in to send messages');
      return;
    }

    const senderUsername = currentUser.username;
    const token = localStorage.getItem('token');

    console.log('senderUsername:', senderUsername);
    console.log('recipientUsername:', username);
    console.log('message:', message);

    if (!senderUsername || !username || !message) {
      alert('All fields are required');
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/mentorship/message`;
      await axios.post(
        url,
        {
          senderUsername,
          recipientUsername: username,
          message,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success('Message sent successfully');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  if (!profile) return null;

  return (
    <div className="profile-popup">
      <ToastContainer />
      <div className="profile-popup-content">
        <svg
          className="close-icon"
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2>{profile.username}'s Profile</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message"
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default ProfilePopup;
