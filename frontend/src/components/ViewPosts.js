// frontend/src/components/ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className="posts">
      <h3>Posts</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post">
            <h4 className="post-title">{post.title}</h4>
            <p className="post-content">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewPosts;


