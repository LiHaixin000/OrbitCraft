// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src="/images/logo.webp" alt="EduConnect Logo" style={styles.logo} />
      </div>
      <h1>EduConnect</h1>
      <p>Connecting Minds, Fostering Futures</p>
    </header>
  );
}

const styles = {
  header: {
    color: 'rgb(101, 65, 65)',
    textAlign: 'center',
    background: '#ffffff',
    padding: '20px 0',
  },
  logoContainer: {
    background: '#ffffff',
  },
  logo: {
    width: '150px',
  },
};

export default Header;
