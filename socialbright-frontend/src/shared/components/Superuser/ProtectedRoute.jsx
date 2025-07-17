import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // If no token, user is not logged in
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are required and the user doesn't match
  if (
    allowedRoles.length > 0 &&
    (!user.roles || !allowedRoles.some(role => user.roles.includes(role)))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render children
  return <Outlet />;
}
