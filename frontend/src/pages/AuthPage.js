import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  console.log(API_BASE_URL); // Check if this logs the correct URL

  const buildUrl = (base, path) => {
    if (base.endsWith('/')) {
      base = base.slice(0, -1);
    }
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return base + path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'register';
    const body = isLogin
      ? { username, password }
      : { username, email, password, confirmPassword };

    const response = await fetch(buildUrl(API_BASE_URL, `/api/auth/${endpoint}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });


    const data = await response.json();
    if (response.ok) {
      if (isLogin) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setMessage('Registration successful, please login');
        setIsLogin(true);
      }
    } else {
      setMessage(data.error || (data.errors ? data.errors.map(err => err.msg).join(', ') : 'Something went wrong'));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          )}
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {message && <div style={styles.message}>{message}</div>}
        <p style={styles.toggleText}>
          {isLogin ? 'Not yet a member?' : 'Already a member?'}{' '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            style={styles.toggle}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Ensure the container takes up the full height of the viewport
    width: '100%',
    backgroundColor: '#fff3e0', // Light orange background to match HomePage
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '200px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#4CAF50',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff7043', // Vibrant orange to match HomePage
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#e64a19',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
  toggleText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  toggle: {
    color: '#1e90ff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default AuthPage;
