// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Get isAuthenticated from Redux

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;  // Render the protected component
};

export default ProtectedRoute;
