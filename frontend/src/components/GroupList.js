import React from 'react';
import { useNavigate } from 'react-router-dom';
import './commonStyles.css';

function GroupList({ groups }) {
  const navigate = useNavigate();

  return (
    <div className="group-list">
      <h3 className="heading">Available Groups</h3>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <span>{group.group_name}</span>
            <button onClick={() => navigate(`/groups/${group.group_name}`)}>Enter Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
