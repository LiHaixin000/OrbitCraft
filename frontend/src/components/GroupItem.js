// frontend/src/components/GroupItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './commonStyles.css';

function GroupItem({ group }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/groups/${group.group_name}`);
  };

  return (
    <div className="group-item" onClick={handleClick}>
      <h4 className="group-name">{group.group_name}</h4>
      <p className="course-code">Course Code: {group.course_code}</p>
      <p className="members-count">Members: {group.members.length}</p>
      <div className="hover-message">Enter Chat</div>
    </div>
  );
}

export default GroupItem;




