// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>Developed by OrbitCraft Team. Contact us at: <a href="mailto:yangtonghang0504@gmail.com" style={styles.link}>yangtonghang0504@gmail.com</a></p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '1em 0',
    position: 'absolute',
    width: '100%',
  },
  link: {
    color: '#1e90ff', // DodgerBlue
    textDecoration: 'none',
  },
};

export default Footer;