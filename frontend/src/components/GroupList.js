// GroupList.js
import React from 'react';
import GroupItem from './GroupItem';
import './commonStyles.css';

function GroupList({ groups }) {
  return (
    <div className="group-list">
      <h3 className="heading">Your Groups</h3>
      {groups.length > 0 ? (
        groups.map((group, index) => <GroupItem key={index} group={group} />)
      ) : (
        <p>You have not joined any groups yet.</p>
      )}
    </div>
  );
}

export default GroupList;
