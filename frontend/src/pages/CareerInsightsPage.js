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
      <h2 className="heading">Career Insights</h2>
      <p className="paragraph">
        Gain insights into various career paths, industry trends, and job opportunities. Connect with professionals to learn about their experiences and get advice on advancing your career.
      </p>
      <div className="instructions-container">
        <h3 className="instructions-heading">How to Use This Page</h3>
        <ul className="instructions-list">
          <li>Click on "View Posts" to explore career insights shared by professionals.</li>
          <li>Use the "Create Post" section to share your own career experiences and advice.</li>
          <li>Engage with the community by commenting on and liking posts.</li>
        </ul>
      </div>
      <div className="links">
        <button className="link" onClick={() => navigate('/view-posts')}>
          View Posts
        </button>
      </div>
      <div id="create-post">
        <CreatePosts />
      </div>
    </div>
  );
}

export default CareerInsightsPage;
