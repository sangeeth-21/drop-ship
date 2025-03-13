
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials
const VALID_CREDENTIALS = {
  admin: { email: 'admin@example.com', password: 'admin123' },
  user: { email: 'user@example.com', password: 'user123' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole as UserRole);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check against hardcoded credentials
    if (email === VALID_CREDENTIALS.admin.email && password === VALID_CREDENTIALS.admin.password) {
      setIsAuthenticated(true);
      setUserRole('admin');
      localStorage.setItem('userRole', 'admin');
      return true;
    } else if (email === VALID_CREDENTIALS.user.email && password === VALID_CREDENTIALS.user.password) {
      setIsAuthenticated(true);
      setUserRole('user');
      localStorage.setItem('userRole', 'user');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
