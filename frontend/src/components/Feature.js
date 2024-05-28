// src/components/Feature.js
import React from 'react';
import { Link } from 'react-router-dom';

function Feature({ title, description, link }) {
  return (
    <div style={styles.feature}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} style={styles.link}>Learn more</Link>
    </div>
  );
}

const styles = {
  feature: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '20px',
  },
  link: {
    color: '#1e90ff', // DodgerBlue
    textDecoration: 'none',
  },
};

export default Feature;
