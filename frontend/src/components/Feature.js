// frontend/src/components/Feature.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Feature({ title, description, link }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.feature,
        ...(isHovered ? styles.featureHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <Link to={link} style={styles.link}>Learn More</Link>
    </div>
  );
}

const styles = {
  feature: {
    flex: '1 1 calc(33.333% - 30px)', // Adjust the flex basis to make features larger
    maxWidth: 'calc(33.333% - 30px)',
    minWidth: '250px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  featureHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  description: {
    color: '#666',
    fontSize: '16px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  link: {
    color: '#ff7043', // Vibrant orange
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Feature;
