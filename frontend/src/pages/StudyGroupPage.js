// frontend/src/pages/StudyGroupPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CreateGroup from '../components/CreateGroup';
import JoinGroup from '../components/JoinGroup';
import GroupList from '../components/GroupList';
import MessageList from '../components/MessageList';
import Notification from '../components/Notification';
import './commonStyles.css';

function StudyGroupPage() {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5;
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch all groups from the backend when the component mounts
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/groups');
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
      <h2 className="heading">Study Groups</h2>
      <p className="paragraph">
        Join study groups to collaborate with peers, share knowledge, and prepare for exams together. Find or create study groups that match your academic interests and schedule.
      </p>
      <CreateGroup onCreateGroup={handleCreateGroup} />
      <JoinGroup onJoinGroup={handleJoinGroup} />
      <h2 className="heading">Available Groups</h2> {/* Updated line */}
      <GroupList groups={currentGroups} paginate={paginate} totalGroups={groups.length} groupsPerPage={groupsPerPage} />
      <MessageList messages={messages} />
      <Notification message={notification} onClose={handleCloseNotification} />
    </div>
  );
}

export default StudyGroupPage;




