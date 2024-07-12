// frontend/src/components/GroupChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import './GroupChat.css'; // Updated to use a specific CSS file for the GroupChat component

function GroupChat() {
  const { groupName } = useParams();
  const { currentUser } = useAuth(); // Get the current user from context
  const navigate = useNavigate(); // Initialize useNavigate
  
  console.log('Current user in GroupChat:', currentUser); // Add this line

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch messages for the group
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups/${groupName}/messages`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
          setError('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [groupName]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!currentUser || !currentUser.username) {
      console.error('Current user is not defined');
      setError('You must be logged in to send messages');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups/${groupName}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage, sender: currentUser.username }), // Remove timestamp from here
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
      } else {
        console.error('Failed to send message');
        setError('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="group-chat-container">
      <button onClick={() => navigate('/studygroup')} className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 className="heading">Group Chat: {groupName}</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}:</strong> {msg.content}
                <span className="timestamp">{formatDate(msg.created_at)}</span> {/* Use created_at */}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="message-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default GroupChat;





