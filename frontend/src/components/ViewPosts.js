// frontend/src/components/ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPosts.css';

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/career-insights/posts`, {
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

  const handleLikePost = (postId, liked) => {
    const token = localStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/career-insights/posts/${postId}/like`;
    const method = liked ? 'delete' : 'post';

    axios({
      method,
      url,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setPosts(posts.map(post =>
          post.id === postId ? { ...post, liked: !liked, likes: liked ? post.likes - 1 : post.likes + 1 } : post
        ));
      })
      .catch(error => {
        console.error(`Error ${liked ? 'unliking' : 'liking'} post:`, error);
      });
  };

  const handleCommentClick = (postId) => {
    console.log(`Comment on post ${postId}`);
  };

  const renderPostContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
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
                <div className="post-content">
                  {renderPostContent(post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content)}
                </div>
                <button className="like-button" onClick={(e) => { e.stopPropagation(); handleLikePost(post.id, post.liked); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill={post.liked ? 'red' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {post.likes || 0}
                </button>
              </div>
            ))}
          </div>
        )}
        {selectedPost && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>&times;</span>
              <h4 className="post-title">{selectedPost.title}</h4>
              <div className="post-content">{renderPostContent(selectedPost.content)}</div>
              <button className="comment-button" onClick={() => handleCommentClick(selectedPost.id)}>
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPosts;

