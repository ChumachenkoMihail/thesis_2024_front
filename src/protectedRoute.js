import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./libs/hooks/useAuth";

const ProtectedRoute = ({ requiredRoles, children }) => {
  const { userRole } = useAuth();
  // Check if the user has the required role
  const hasAccess = userRole && requiredRoles.includes(userRole);
  if (!hasAccess) {
    return <Navigate to="/search" />;
  }
  return children;
};

export default ProtectedRoute;
