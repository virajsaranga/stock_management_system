// src/components/RoleBasedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default RoleBasedRoute;
