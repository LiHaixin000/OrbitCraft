// src/components/JoinGroup.js
import React, { useState } from 'react';
import './commonStyles.css';

function JoinGroup({ onJoinGroup }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoinGroup(searchTerm);
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