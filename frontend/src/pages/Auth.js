import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle login
        const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      } else {
        // Handle registration
        const res = await axios.post('http://localhost:5001/api/auth/register', { username, password });
        setMessage(res.data.msg);
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setMessage(err.response ? err.response.data.msg : 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Auth;
