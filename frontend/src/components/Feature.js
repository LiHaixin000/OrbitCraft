// src/components/Feature.js
import React from 'react';
import { Link } from 'react-router-dom';

function Feature({ title, description, link }) {
  return (
    <div style={styles.feature}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} style={styles.link}>Learn More</Link>
    </div>
  );
}

const styles = {
  feature: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default Feature;
