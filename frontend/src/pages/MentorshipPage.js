// frontend/src/pages/MentorShipPage.js
// frontend/src/pages/MentorShipPage.js
import React, { useState } from 'react';
import './commonStyles.css'; // Import the common styles
import '../pagesCss/MentorshipPage.css'; // Import the new CSS file
import RegisterMentor from '../components/RegisterMentor';
import RegisterMentee from '../components/RegisterMentee';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function MentorshipPage() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

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
      alert('Failed to fetch matches');
    }
  };

  return (
    <div className="container mentorship-page">
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
          <ul className="matches-list">
            {matches.map((match, index) => (
              <li key={index}>{match.mentor} is matched with {match.mentee}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MentorshipPage;
