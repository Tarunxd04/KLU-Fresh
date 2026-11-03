import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user || !isAdmin) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
