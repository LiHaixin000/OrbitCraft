import React from 'react';
import './Notification.css';

function Notification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="notification">
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Notification;
