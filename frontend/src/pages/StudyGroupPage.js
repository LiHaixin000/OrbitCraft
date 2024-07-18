// frontend/src/pages/StudyGroupPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CreateGroup from '../components/CreateGroup';
import JoinGroup from '../components/JoinGroup';
import GroupList from '../components/GroupList';
import MessageList from '../components/MessageList';
import Notification from '../components/Notification';
import Instructions from '../components/Instructions'; // Import the Instructions component
import '../pagesCss/StudyGroupPage.css'; // Import the new CSS file

function StudyGroupPage() {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 4;
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch all groups from the backend when the component mounts
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups`);
        if (response.ok) {
          const data = await response.json();
          setGroups(data);
        } else {
          console.error('Failed to fetch groups');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = (newGroup) => {
    if (newGroup.group_name) {
      setGroups([...groups, newGroup]);
      setMessages([...messages, { type: 'groupCreated', group: newGroup }]);
      setNotification(`Group "${newGroup.group_name}" created successfully!`);
    } else {
      setNotification('Failed to create group: Group name is missing.');
    }
  };

  const handleJoinGroup = (group) => {
    setGroups([...groups, group]);
    setMessages([...messages, { type: 'joinRequest', group }]);
    navigate(`/groups/${group.group_name}`);
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  // Pagination logic
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M8 12H21" />
        </svg>
      </button>
      <h2 className="heading">Study Groups</h2>
      <p className="paragraph">
        Join study groups to collaborate with peers, share knowledge, and prepare for exams together. Find or create study groups that match your academic interests and schedule.
      </p>
      <Instructions /> {/* Add the Instructions component here */}
      <div className="form-container">
        <CreateGroup onCreateGroup={handleCreateGroup} />
        <JoinGroup onJoinGroup={handleJoinGroup} />
      </div>
      <h2 className="heading">Available Groups</h2>
      <GroupList groups={currentGroups} paginate={paginate} totalGroups={groups.length} groupsPerPage={groupsPerPage} />
      <MessageList messages={messages} />
      <Notification message={notification} onClose={handleCloseNotification} />
    </div>
  );
}

export default StudyGroupPage;
