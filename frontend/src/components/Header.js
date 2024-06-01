import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src="/images/logo.png" alt="EduConnect Logo" style={styles.logo} />
      </div>
      <nav style={styles.nav}>
        {['/', '/Mentorship', '/Study Group', '/Resources', '/Career'].map((path, index) => (
          <Link
            key={index}
            to={path}
            style={{
              ...styles.navLink,
              ...(hoveredLink === index ? styles.navLinkHover : {})
            }}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {path === '/' ? 'Home' : path.replace('/', '').replace(/([A-Z])/g, ' $1').trim()}
          </Link>
        ))}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    width: '100vw',
    boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
    padding: '5px 20px', // Adjust padding to add space to the left and right
    backgroundColor: '#ff7043', // Vibrant orange
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '70px', // Adjust the size of the logo as needed
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  navLinkHover: {
    color: '#ffd54f',
  },
};

export default Header;
