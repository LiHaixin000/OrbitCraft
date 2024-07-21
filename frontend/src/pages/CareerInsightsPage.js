// frontend/src/pages/CareerInsightsPage.js
import React from 'react';
import '../pagesCss/commonStyles.css'; // Import the common styles
import '../pagesCss/CareerInsightsPage.css'; // Import the page-specific styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CreatePosts from '../components/CreatePosts';

function CareerInsightsPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M8 12H21" />
        </svg>
      </button>
      <h2 className="heading">Career Insights</h2>
      <p className="paragraph">
        Gain insights into various career paths, industry trends, and job opportunities. Connect with professionals to learn about their experiences and get advice on advancing your career.
      </p>
      <div className="instructions-container">
        <h3 className="instructions-heading">How to Use This Page</h3>
        <ul className="instructions-list">
          <li>Click on "View Posts" to explore career insights shared by professionals.</li>
          <li>Use the "Create Post" section to share your own career experiences and advice.</li>
          <li>Engage with the community by liking the posts.</li>
        </ul>
      </div>
      <div id="create-post">
        <CreatePosts />
      </div>
      <div className="links">
        <button className="link" onClick={() => navigate('/view-posts')}>
          View Posts
        </button>
      </div>
    </div>
  );
}

export default CareerInsightsPage;

