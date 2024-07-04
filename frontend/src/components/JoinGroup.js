// frontend/src/components/JoinGroup.js
import React, { useState, useEffect } from 'react';
import './commonStyles.css';

function JoinGroup({ onJoinGroup }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = localStorage.getItem('currentUser'); // Retrieve the current user

  useEffect(() => {
    const fetchGroups = async () => {
      if (searchTerm.length > 0) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups?search=${searchTerm}`);
          if (response.ok) {
            const data = await response.json();
            setFilteredGroups(data);
          } else {
            console.error('Failed to fetch groups');
            setError('Failed to fetch groups');
          }
        } catch (error) {
          console.error('Error fetching groups:', error);
          setError('Error fetching groups');
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredGroups([]);
      }
    };

    const debounceFetch = setTimeout(fetchGroups, 300); 

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleSelectGroup = (group) => {
    setSearchTerm(group.group_name);
    setFilteredGroups([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!searchTerm || !currentUser) {
      alert('Group name and user are required');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName: searchTerm, member: currentUser }),
      });
  
      if (response.ok) {
        const group = await response.json();
        console.log('Group data:', group); // Log the group data for debugging
  
        // Check if the current user is already a member
        const isMember = group.members.some(member => member.username === currentUser);
        
        if (isMember) {
          alert('You are already a member of this group');
        } else {
          onJoinGroup(group);
        }
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
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {filteredGroups.length > 0 && (
        <ul className="dropdown">
          {filteredGroups.map((group, index) => (
            <li key={index} onClick={() => handleSelectGroup(group)}>
              {group.group_name}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Join</button>
    </form>
  );
}

export default JoinGroup;
