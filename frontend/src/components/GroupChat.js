// src/components/GroupChat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './commonStyles.css';

function GroupChat() {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch existing messages for the group from the backend
    fetch(`/api/groups/${groupName}/messages`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, [groupName]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Send the new message to the backend
    try {
      const response = await fetch(`/api/groups/${groupName}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h3 className="heading">{groupName} Chat</h3>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default GroupChat;
