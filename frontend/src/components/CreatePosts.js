// frontend/src/components/CreatePosts.js
import React, { useState } from 'react';
import axios from 'axios';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !content) {
      setError('Title and Content are required');
      return;
    }

    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    axios.post('http://localhost:5001/api/career-insights/posts', { title, content }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        alert('Post created successfully');
        setTitle('');
        setContent('');
        setError(null);
      })
      .catch(error => {
        console.error('Error creating post:', error);
        setError('Error creating post');
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label" htmlFor="title">Title</label>
        <input
          className="input"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="content">Content</label>
        <textarea
          className="textarea"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button className="button" type="submit">Create Post</button>
    </form>
  );
}

export default CreatePosts;

