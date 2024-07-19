// frontend/src/components/ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPosts.css'; // Import the new CSS file

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    axios.get('http://localhost:5001/api/career-insights/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data) {
          setPosts(response.data);
        } else {
          setError('No posts available');
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      });
  }, []);

  const getRandomColor = () => {
    const colors = ['#FFEB3B', '#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFCC80'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  const handleBackClick = () => {
    navigate('/careerinsights');
  };

  return (
    <div className="posts-container">
      <div className="posts-list-container">
        <button className="back-button" onClick={handleBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7M8 12H21" />
          </svg>
        </button>
        <h3 className="posts-heading">Posts</h3>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="posts-wrapper">
            {posts.map(post => (
              <div 
                key={post.id} 
                className="post-card" 
                style={{ backgroundColor: getRandomColor() }}
                onClick={() => handlePostClick(post)}
              >
                <h4 className="post-title">{post.title}</h4>
                <p className="post-content">
                  {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
                </p>
              </div>
            ))}
          </div>
        )}
        {selectedPost && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>&times;</span>
              <h4 className="post-title">{selectedPost.title}</h4>
              <p className="post-content">{selectedPost.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPosts;





