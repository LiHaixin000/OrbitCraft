// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Feature from '../components/Feature';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <section style={styles.intro}>
        <h2>About EduConnect</h2>
        <p>
          EduConnect is designed to connect NUS students for mentorship and study groups. Our platform aims to enhance academic collaboration and facilitate meaningful mentorship connections.
        </p>
      </section>
      <Feature
        title="Mentorship Matching System"
        description="Connects students with alumni and industry professionals. Matches based on shared interests, academic backgrounds, and career goals. Facilitates meaningful mentorship relationships."
        link="/mentorship"
      />
      <Feature
        title="Study Group Formation Tool"
        description="Enables creation, discovery, and joining of study groups within courses or subject areas. Supports group chat, scheduling study sessions, and sharing resources. Enhances peer learning and collaboration."
        link="/studygroup"
      />
      <Feature
        title="Academic Resource Sharing"
        description="Provides a centralized platform for sharing lecture notes, study guides, and past papers. Encourages collaborative learning. Ensures easy access to a wealth of academic resources."
        link="/resourcesharing"
      />
      <Feature
        title="Career Insights Panel"
        description="Offers webinars, Q&A sessions, and panel discussions with alumni and industry professionals. Provides valuable career advice and industry insights. Enhances networking opportunities and career development."
        link="/careerinsights"
      />
      <button onClick={() => {
        localStorage.removeItem('token');
        navigate('/auth');
      }}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  intro: {
    marginBottom: '20px',
  },
};

export default HomePage;
