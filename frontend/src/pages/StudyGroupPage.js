import React, { useState } from 'react';
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
  const navigate = useNavigate(); 

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

  return (
    <div className="container">
      <h2 className="heading">Study Groups</h2>
      <p className="paragraph">
        Join study groups to collaborate with peers, share knowledge, and prepare for exams together. Find or create study groups that match your academic interests and schedule.
      </p>
      <CreateGroup onCreateGroup={handleCreateGroup} />
      <JoinGroup onJoinGroup={handleJoinGroup} />
      <GroupList groups={groups} />
      <MessageList messages={messages} />
      <Notification message={notification} onClose={handleCloseNotification} />
    </div>
  );
}

export default StudyGroupPage;
