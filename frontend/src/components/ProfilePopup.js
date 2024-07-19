import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import './ProfilePopup.css';

const ProfilePopup = ({ username, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth(); // Get the current user from context

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      try {
        console.log(`Fetching profile for: ${username}`); // Debugging statement
        const response = await axios.get(`http://localhost:5001/api/mentorship/profile/${username}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          }
        });
        setProfile(response.data);
        console.log('Profile fetched:', response.data); // Debugging statement
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
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Log the values to debug
    console.log('senderUsername:', senderUsername);
    console.log('recipientUsername:', username);
    console.log('message:', message);

    if (!senderUsername || !username || !message) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5001/api/mentorship/message',
        {
          senderUsername,
          recipientUsername: username,
          message,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          }
        }
      );
      alert('Message sent successfully');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  if (!profile) return null;

  return (
    <div className="profile-popup">
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
