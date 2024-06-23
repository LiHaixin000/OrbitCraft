import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
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
  

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="major"
          placeholder="Major"
          value={profile.major}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleChange}
          style={styles.textarea}
        />
        <select
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
        <select
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
    padding: '20px',
    backgroundColor: '#fff3e0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
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
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Profile;

