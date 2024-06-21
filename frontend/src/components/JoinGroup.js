import React, { useState } from 'react';
import './commonStyles.css';

function JoinGroup({ onJoinGroup }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName: searchTerm, member: 'currentUser' }), // Replace 'currentUser' with actual user identifier
      });

      if (response.ok) {
        const group = await response.json();
        onJoinGroup(group);
      } else {
        const errorMessage = await response.json();
        alert('Failed to join group: ' + errorMessage.message);
      }
    } catch (error) {
      console.error('Error joining group:', error);
      alert('Failed to join group: Server error');
    }
    setSearchTerm('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="heading">Join Group</h3>
      <input
        type="text"
        placeholder="Search by Course Code or Interest"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button type="submit">Join</button>
    </form>
  );
}

export default JoinGroup;
