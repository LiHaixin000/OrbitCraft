// frontend/src/components/GroupList.js
import React from 'react';
import GroupItem from './GroupItem';
import './commonStyles.css';

function GroupList({ groups, paginate, totalGroups, groupsPerPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGroups / groupsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="group-list">
      <div className="group-cards">
        {groups.map(group => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <span key={number} className="page-link" onClick={() => paginate(number)}>
            {number}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GroupList;


