import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, currentRole } = useApp();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role, redirect to appropriate dashboard
  if (allowedRole && currentRole !== allowedRole) {
    return (
      <Navigate
        to={currentRole === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
