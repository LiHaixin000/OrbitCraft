// frontend/src/components/MessageList.js
import React from 'react';
import './commonStyles.css';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      <h3 className="heading">Messages</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.type === 'groupCreated' && `Group "${message.group.group_name}" created.`}
            {message.type === 'joinRequest' && `Join request for group "${message.group.group_name}".`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
