import React from 'react';

function Mentorship() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mentorship Matching System</h2>
      <p style={styles.paragraph}>
        Connects students with alumni and industry professionals. Matches based on shared interests, academic backgrounds, and career goals. Facilitates meaningful mentorship relationships.
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px', // Ensure it matches the max width used in HomePage
    margin: '0 auto', // Center the container
    padding: '20px',
    boxSizing: 'border-box', // Include padding in the element's total width and height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center', // Center text to match the HomePage style
  },
  heading: {
    fontSize: '28px', // Adjust font size to match HomePage headings
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333', // Ensure consistent text color
  },
  paragraph: {
    fontSize: '16px', // Adjust font size to match HomePage text
    lineHeight: '1.5',
    color: '#666', // Ensure consistent text color
    maxWidth: '800px', // Limit paragraph width for better readability
    margin: '0 auto', // Center the paragraph
  },
};

export default Mentorship;
