// frontend/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10;
  const endYear = currentYear + 10;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const [profile, setProfile] = useState({
    username: '',
    age: '',
    major: '',
    description: '', 
    gender: '',
    year_of_graduation: '',
    profileComplete: false,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const url = `${process.env.REACT_APP_API_BASE_URL}/api/profile`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          ...response.data,
          description: response.data.description || '', // Ensure description is not null
        });
      } catch (error) {
        setError('Error fetching profile');
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const url = `${process.env.REACT_APP_API_BASE_URL}/api/profile`;

      const response = await axios.put(url, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile saved', response.data);
    } catch (error) {
      setError('Error saving profile');
      console.error('Error saving profile:', error.response ? error.response.data : error.message);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Profile for {profile.username}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="age" style={styles.label}>Age</label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
          style={styles.input}
        />
        <label htmlFor="major" style={styles.label}>Major</label>
        <input
          type="text"
          id="major"
          name="major"
          placeholder="Major"
          value={profile.major}
          onChange={handleChange}
          style={styles.input}
        />
        <label htmlFor="description" style={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={profile.description || ''} // Ensure description is not null
          onChange={handleChange}
          style={styles.textarea}
        />
        <label htmlFor="gender" style={styles.label}>Gender</label>
        <select
          id="gender"
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="year_of_graduation" style={styles.label}>Year of Graduation</label>
        <select
          id="year_of_graduation"
          name="year_of_graduation"
          value={profile.year_of_graduation}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Year of Graduation</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>Save</button>
      </form>
      <button onClick={handleBack} style={styles.backButton}>Back to Home</button>
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
    width: '100vw',
    padding: '20px',
    backgroundColor: '#ffefd5',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  label: {
    margin: '10px 0 5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    margin: '10px 0',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    margin: '10px 0',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    height: '100px',
  },
  select: {
    margin: '10px 0',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

const globalStyles = `
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #ffefd5;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Profile;
