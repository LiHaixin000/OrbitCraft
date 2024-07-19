// frontend/src/pages/MentorshipPage.js
import React, { useState } from 'react';
import './commonStyles.css'; 
import '../pagesCss/MentorshipPage.css'; 
import RegisterMentor from '../components/RegisterMentor';
import RegisterMentee from '../components/RegisterMentee';
import ProfilePopup from '../components/ProfilePopup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

function MentorshipPage() {
  const [matches, setMatches] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const navigate = useNavigate(); 

  const handleViewMatches = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:5001/api/mentorship/match', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error('Failed to fetch matches');
    }
  };

  const handleUserClick = (user) => {
    console.log('User clicked:', user); 
    setSelectedUser(user);
  };

  return (
    <div className="container mentorship-page">
      <ToastContainer />
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M8 12H21" />
        </svg>
      </button>
      <h2 className="heading">Mentorship Matching System</h2>
      <p className="paragraph">
        Connects students with alumni and industry professionals. Matches based on shared interests, academic backgrounds, and career goals. Facilitates meaningful mentorship relationships.
      </p>
      <div className="instructions-container">
        <h3 className="instructions-heading">How to Use This Page</h3>
        <ul className="instructions-list">
          <li>Register as a Mentor if you are an industry professional or alumni willing to guide students.</li>
          <li>Register as a Mentee if you are a student seeking mentorship.</li>
          <li>Click on "View Matches" to see your mentorship matches based on your profile and interests.</li>
        </ul>
      </div>
      <div className="registration-section">
        <div className="registration-block">
          <h3>Register as Mentor</h3>
          <RegisterMentor />
        </div>
        <div className="registration-block">
          <h3>Register as Mentee</h3>
          <RegisterMentee />
        </div>
      </div>
      <div className="matches-section">
        <button className="view-matches-button" onClick={handleViewMatches}>View Matches</button>
        {matches.length > 0 && (
          <div className="matches-container">
            {matches.map((match, index) => (
              <button key={index} className="match-button" onClick={() => handleUserClick(match.mentee || match.mentor)}>
                {match.mentee ? `${match.mentee}` : `${match.mentor}`}
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedUser && (
        <ProfilePopup username={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

export default MentorshipPage;
