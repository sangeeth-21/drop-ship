
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    // Redirect to login page
    navigate("/login", { replace: true });
  }, [navigate]);

  // If already authenticated, redirect to the appropriate dashboard
  if (isAuthenticated) {
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (userRole === 'user') {
      return <Navigate to="/dashboard/store" />;
    }
  }

  // This component should not render anything as it will immediately redirect
  return null;
};

export default Auth;
