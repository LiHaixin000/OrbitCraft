// frontend/src/pages/MentorShipPage.js
import React, { useState } from 'react';
import './commonStyles.css'; // Import the common styles
import RegisterMentor from '../components/RegisterMentor';
import RegisterMentee from '../components/RegisterMentee';
import axios from 'axios';

function MentorshipPage() {
  const [matches, setMatches] = useState([]);

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
    <div className="container">
      <h2 className="heading">Mentorship Matching System</h2>
      <p className="paragraph">
        Connects students with alumni and industry professionals. Matches based on shared interests, academic backgrounds, and career goals. Facilitates meaningful mentorship relationships.
      </p>
      <div>
        <h3>Register as Mentor</h3>
        <RegisterMentor />
      </div>
      <div>
        <h3>Register as Mentee</h3>
        <RegisterMentee />
      </div>
      <div>
        <button onClick={handleViewMatches}>View Matches</button>
      </div>
      <div>
        {matches.length > 0 && (
          <ul>
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



