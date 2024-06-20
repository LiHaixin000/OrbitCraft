// CreateGroup.js
import React, { useState } from 'react';
import './commonStyles.css';

function CreateGroup({ onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGroup = { groupName, courseCode, members: [] };
    onCreateGroup(newGroup);
    setGroupName('');
    setCourseCode('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="heading">Create Group</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateGroup;
