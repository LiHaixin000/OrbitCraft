// GroupItem.js
import React from 'react';
import './commonStyles.css';

function GroupItem({ group }) {
  return (
    <div className="group-item">
      <h4>{group.groupName}</h4>
      <p>Course Code: {group.courseCode}</p>
      <p>Members: {group.members.length}</p>
    </div>
  );
}

export default GroupItem;
