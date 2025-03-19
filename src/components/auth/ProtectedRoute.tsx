
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'admin' | 'user' | 'both';
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Always render children without protection
  return <>{children}</>;
};

export default ProtectedRoute;
