import React, { useState, useEffect } from 'react';
import './commonStyles.css';

function CreateGroup({ onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://api.nusmods.com/v2/2023-2024/moduleList.json')
      .then(response => response.json())
      .then(data => {
        const moduleCodes = data.map(module => `${module.moduleCode} ${module.title}`);
        setModules(moduleCodes);
      })
      .catch(error => console.error('Error fetching modules:', error));
  }, []);

  const handleCourseCodeChange = (e) => {
    const value = e.target.value;
    setCourseCode(value);

    if (value.length > 0) {
      const filtered = modules.filter(module =>
        module.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredModules(filtered);
    } else {
      setFilteredModules([]);
    }
  };

  const handleSelectModule = (module) => {
    setCourseCode(module);
    setFilteredModules([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGroup = { groupName, courseCode, members: [] };

    // Ensure groupName is not empty before proceeding
    if (!groupName) {
      setError('Group name is required');
      return;
    }

    // Log the newGroup object to check its structure
    console.log('Creating group with:', newGroup);

    // Send new group to backend
    try {
      const response = await fetch('http://localhost:5001/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (response.ok) {
        const createdGroup = await response.json();
        onCreateGroup(createdGroup);
        setGroupName('');
        setCourseCode('');
        setFilteredModules([]);
        setError('');
      } else {
        const errorMessage = await response.json();
        console.error('Failed to create group', errorMessage);
        setError('Failed to create group: ' + errorMessage.message);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Error creating group: ' + error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="heading">Create Group</h3>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Course Code:</label>
        <input
          type="text"
          value={courseCode}
          onChange={handleCourseCodeChange}
          required
        />
        {filteredModules.length > 0 && (
          <ul className="dropdown">
            {filteredModules.map((module, index) => (
              <li key={index} onClick={() => handleSelectModule(module)}>
                {module}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
}

export default CreateGroup;
