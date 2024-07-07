// frontend/src/components/CreatePosts.js
import React, { useState } from 'react';
import axios from 'axios';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/career-insights/posts', { title, content })
      .then(response => {
        alert('Post created successfully');
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error creating post:', error);
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
      <button className="button" type="submit">Create Post</button>
    </form>
  );
}

export default CreatePosts;