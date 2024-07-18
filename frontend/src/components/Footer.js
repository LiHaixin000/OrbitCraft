import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons

function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: <FaFacebook /> },
    { name: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <FaInstagram /> },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.contactInfo}>
        <a href="mailto:yangtonghang@u.nus.edu" style={styles.footerText}>Contact us: yangtonghang@u.nus.edu</a>
      </div>
      <div style={styles.socialLinks}>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            style={{
              ...styles.socialLink,
              ...(hoveredLink === index ? styles.socialLinkHover : {})
            }}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: '100vw',
    height: '60px', // Set height to match the header
    boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
    backgroundColor: '#ff7043', // Vibrant orange
    padding: '10px 20px', // Consistent padding with the header
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for separation
    borderTop: '2px solid #d2691e', // Similar border color as header
  },
  contactInfo: {
    color: '#fff',
    fontSize: '14px',
  },
  footerText: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
  },
  socialLink: {
    color: '#fff',
    fontSize: '24px',
    transition: 'color 0.3s ease',
  },
  socialLinkHover: {
    color: '#ffd54f',
  },
};

export default Footer;
