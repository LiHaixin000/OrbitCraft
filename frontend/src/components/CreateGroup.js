// src/components/CreateGroup.js
import React, { useState, useEffect } from 'react';
import './commonStyles.css';

function CreateGroup({ onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);

  useEffect(() => {
    // Fetch NUS modules from NUSMods API
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
      ); // Include all matching results
      setFilteredModules(filtered);
    } else {
      setFilteredModules([]);
    }
  };

  const handleSelectModule = (module) => {
    setCourseCode(module);
    setFilteredModules([]);
  };

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
