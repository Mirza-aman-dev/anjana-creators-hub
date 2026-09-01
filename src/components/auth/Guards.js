import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PublicRoute = () => {
  return <Outlet />;
};

export const UserProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  
  // If user doesn't have a fullName, they haven't completed onboarding
  if (!user.fullName) return <Navigate to="/onboarding" replace />;

  return <Outlet />;
};

export const SubscriptionProtectedRoute = () => {
  const { user, isLocked, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/" replace />;
  
  if (isLocked) return <Navigate to="/pricing" replace />;
  
  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { user, role, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user || role !== 'admin') return <Navigate to="/" replace />;
  
  return <Outlet />;
};
