// StudyGroupPage.js
import React, { useState } from 'react';
import CreateGroup from '../components/CreateGroup';
import JoinGroup from '../components/JoinGroup';
import MessageList from '../components/MessageList';
import GroupList from '../components/GroupList';
import './commonStyles.css';

function StudyGroupPage() {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    setMessages([...messages, { type: 'groupCreated', group: newGroup }]);
  };

  const handleJoinGroup = (group) => {
    setMessages([...messages, { type: 'joinRequest', group }]);
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
    </div>
  );
}

export default StudyGroupPage;