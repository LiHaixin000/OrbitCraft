import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      try {
        const response = await axios.get('http://localhost:5001/api/mentorship/messages', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          }
        });
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div style={styles.messagesContainer}>
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul style={styles.messageList}>
          {messages.map((message, index) => (
            <li key={index} style={styles.messageItem}>
              <strong>From: {message.sender_username}</strong> {/* Ensure the property name matches the backend response */}
              <p>{message.message}</p>
              <small>{new Date(message.timestamp).toLocaleString()}</small> {/* Display the timestamp */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  messagesContainer: {
    padding: '20px',
  },
  messageList: {
    listStyleType: 'none',
    padding: 0,
  },
  messageItem: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  },
};

export default Messages;
