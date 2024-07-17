// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Get the authentication status from context

  if (loading) {
    return <div>Loading...</div>; // Optionally, you can show a loading spinner here
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
