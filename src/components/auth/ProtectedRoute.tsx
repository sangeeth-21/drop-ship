
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'admin' | 'user' | 'both';
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if the user has the required role
  if (
    allowedRole === 'both' ||
    userRole === allowedRole ||
    (allowedRole === 'admin' && userRole === 'admin') ||
    (allowedRole === 'user' && userRole === 'user')
  ) {
    return <>{children}</>;
  }

  // Redirect to appropriate dashboard if authenticated but wrong role
  if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/dashboard/store" replace />;
  }
};

export default ProtectedRoute;
