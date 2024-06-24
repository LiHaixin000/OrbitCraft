import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10; // 10 years before current year
  const endYear = currentYear + 10; // 10 years after current year
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const [profile, setProfile] = useState({
    age: '',
    major: '',
    bio: '',
    gender: '',
    year_of_graduation: '',
    profileComplete: false,
  });

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
      console.log('Token:', token); // Log the token to ensure it's retrieved correctly

      const url = `${process.env.REACT_APP_API_BASE_URL}/api/profile`;
      console.log('Submitting to:', url); // Log the URL to ensure it's correct

      const response = await axios.put(url, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile saved', response.data);
    } catch (error) {
      console.error('Error saving profile:', error.response ? error.response.data : error.message);
    }
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Profile</h2>
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
        <label htmlFor="bio" style={styles.label}>Bio</label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Bio"
          value={profile.bio}
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
    backgroundColor: '#ffefd5', // Light orange background color
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
    backgroundColor: '#007bff', // Blue background color for button
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043', // Grey background color for back button
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

// Additional global styles to ensure the background covers the entire screen
const globalStyles = `
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #ffefd5; /* Light orange background color */
  }
`;

// Inject global styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Profile;
