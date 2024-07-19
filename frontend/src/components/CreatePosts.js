// frontend/src/components/CreatePosts.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import './CreatePosts.css'; // Import the new CSS file

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
        toast.success('Post created successfully');
        setTitle('');
        setContent('');
        setError(null);
      })
      .catch(error => {
        console.error('Error creating post:', error);
        toast.error('Error creating post');
        setError('Error creating post');
      });
  };

  return (
    <div>
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
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
        {error && <p className="error">{error}</p>}
        <button className="button" type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePosts;


