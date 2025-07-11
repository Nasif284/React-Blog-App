import React from "react";
import { useAuth } from "../Context/authContext";
import { Navigate } from "react-router";

const AdminAuth = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading</p>; 
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.email !== "admin@example.com") {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default AdminAuth;
