// frontend/src/components/CreatePosts.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreatePosts.css';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!title || !content) {
      setError('Title and Content are required');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/career-insights/posts`;
      await axios.post(url, 
        { title, content }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      toast.success('Post created successfully');
      setTitle('');
      setContent('');
      setError(null);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post');
      setError('Error creating post');
    }
  };
  

  return (
    <div>
      <ToastContainer />
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


