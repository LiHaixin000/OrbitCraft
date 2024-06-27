// frontend/src/components/GroupChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './GroupChat.css'; // Updated to use a specific CSS file for the GroupChat component

function GroupChat() {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch messages for the group
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/groups/${groupName}/messages`);
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

    try {
      const response = await fetch(`http://localhost:5001/api/groups/${groupName}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage, sender: 'currentUser' }), // Replace 'currentUser' with actual user identifier
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

  return (
    <div className="group-chat-container">
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