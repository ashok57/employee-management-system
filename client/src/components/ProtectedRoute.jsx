
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, authLoading } = useAuth();

  const location = useLocation();

  // Wait for authentication verification
  if (authLoading) {
    return (
      <div className="status-message">
        Checking authentication...
      </div>
    );
  }

  // Redirect if user is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Check user role
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
