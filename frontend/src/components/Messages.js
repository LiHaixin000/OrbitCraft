// frontend/src/components/Message.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');

      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/api/mentorship/messages`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessages(response.data);
        setFilteredMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const results = messages.filter(message =>
      message.sender_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(results);
  }, [searchTerm, messages]);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Messages</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.messagesContainer}>
        {filteredMessages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <ul style={styles.messageList}>
            {filteredMessages.map((message, index) => (
              <li key={index} style={styles.messageItem}>
                <div style={styles.messageHeader}>
                  <strong style={styles.sender}>{message.sender_username}</strong>
                  <small style={styles.timestamp}>{new Date(message.timestamp).toLocaleString()}</small>
                </div>
                <p style={styles.messageText}>{message.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    height: '100%',
    maxHeight: '1200px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff7f0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#202124',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    maxWidth: '1000px',
    padding: '10px',
    borderRadius: '24px',
    border: '1px solid #ddd',
    fontSize: '16px',
    paddingLeft: '20px',
  },
  messagesContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '600px', // Added maxHeight for scrolling
    overflowY: 'auto', // Added overflow property for scrolling
  },
  messageList: {
    listStyleType: 'none',
    padding: 0,
  },
  messageItem: {
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
    marginBottom: '10px',
    transition: 'background-color 0.3s',
  },
  messageItemHover: {
    backgroundColor: '#f1f3f4',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px',
  },
  sender: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1a73e8',
  },
  timestamp: {
    fontSize: '12px',
    color: '#5f6368',
  },
  messageText: {
    fontSize: '14px',
    color: '#3c4043',
  },
};

export default Messages;
