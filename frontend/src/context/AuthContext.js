// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add isAuthenticated state
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchCurrentUser = useCallback(async (token) => {
    setLoading(true);
    try {
      console.log('Fetching current user with token:', token);
      const response = await fetch(`${API_BASE_URL}/api/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const user = await response.json();
        console.log('Fetched user:', user);
        setCurrentUser(user);
        setIsAuthenticated(true); // Set isAuthenticated to true
      } else {
        console.error('Failed to fetch current user, response not OK');
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Set isAuthenticated to false
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false); // Set isAuthenticated to false
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        await fetchCurrentUser(data.token); // Fetch and set the current user profile
        setIsAuthenticated(true); // Set isAuthenticated to true
        navigate('/');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false); // Set isAuthenticated to false
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
