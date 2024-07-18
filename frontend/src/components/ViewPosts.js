// frontend/src/components/ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewPosts.css'; // Import the new CSS file

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="posts-container">
      <h3 className="posts-heading">Posts</h3>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="posts-wrapper">
          {posts.map(post => (
            <div key={post.id} className="post-card" style={{ backgroundColor: getRandomColor() }}>
              <h4 className="post-title">{post.title}</h4>
              <p className="post-content">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewPosts;


