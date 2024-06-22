import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src="/images/logo.png" alt="EduConnect Logo" style={styles.logo} />
      </div>
      <nav style={styles.nav}>
        {[
          { path: '/', label: 'Home' },
          { path: '/mentorship', label: 'Mentorship' },
          { path: '/studygroup', label: 'Study Group' },
          { path: '/resourcesharing', label: 'Resources' },
          { path: '/careerinsights', label: 'Career Insights' },
        ].map((link, index) => (
          <Link
            key={index}
            to={link.path}
            style={{
              ...styles.navLink,
              ...(hoveredLink === index ? styles.navLinkHover : {})
            }}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div style={styles.profileContainer}>
        <button
          style={styles.profileButton}
          onClick={() => navigate('/profile')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: '100vw',
    boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
    padding: '5px 20px', // Adjust padding to add space to the left and right
    backgroundColor: '#ff7043',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '80px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  navLinkHover: {
    color: '#ffd54f',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profileButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Header;
