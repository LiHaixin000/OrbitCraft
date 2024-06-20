import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [major, setMajor] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { age, major, description, upload: false };

    const response = await fetch('http://localhost:5001/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      setMessage('Profile updated successfully');
      navigate('/');
    } else {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Save</button>
      </form>
      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
};

export default ProfilePage;