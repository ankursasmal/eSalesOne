// src/router/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.user);

  if (!user?.email) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if ( !user?.email) {
    // Logged in but not an admin
    return <Navigate to="/home" />;
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
