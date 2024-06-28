// src/components/ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/career-insights/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className="posts">
      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h4 className="post-title">{post.title}</h4>
          <p className="post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewPosts;