import React from 'react';
import { FaBars } from 'react-icons/fa'; // Importing an icon for the hamburger menu

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.left}>
          <img src="/images/logo.webp" alt="EduConnect Logo" style={styles.logo} />
          <button style={styles.homeButton}>Home</button>
        </div>
        <div style={styles.right}>
          <FaBars style={styles.hamburger} />
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    color: '#654141',
    background: '#ffffff',
    padding: '0', // Removed padding to ensure no extra space
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease', // Smooth transition for scrolling
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px', // Added padding to the sides for better spacing
    boxSizing: 'border-box', // Include padding in width calculation
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 'auto', // Push left section to the left
  },
  logo: {
    width: '70px', // Reduced logo size
    marginRight: '20px',
    marginLeft: '0', // Ensure no left margin
  },
  homeButton: {
    background: 'none',
    border: 'none',
    color: '#654141',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px',
    fontWeight: 'bold',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto', // Push right section to the right
  },
  hamburger: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#654141',
  },
};

export default Header;
