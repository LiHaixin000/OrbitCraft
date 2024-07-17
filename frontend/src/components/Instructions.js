// frontend/src/components/Instructions.js
import React from 'react';
import './commonStyles.css';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h3 className="instructions-heading">How to Use the Study Group Page</h3>
      <ul className="instructions-list">
        <li>To create a new study group, fill out the form in the "Create Group" section and click "Create Group".</li>
        <li>To join an existing study group, fill out the form in the "Join Group" section and click "Join Group".</li>
        <li>Use the search bar to find specific study groups by name or topic.</li>
        <li>Navigate through the available groups using the pagination controls at the bottom of the page.</li>
        <li>Click on a group name to view more details and interact with group members.</li>
      </ul>
    </div>
  );
};

export default Instructions;
