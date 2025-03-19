
import React, { createContext, useContext } from 'react';

// Simple AuthContext that always returns authenticated with admin role
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'admin' | 'user';
  login: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always authenticated with admin role
  const isAuthenticated = true;
  const userRole = 'admin';

  const login = async (): Promise<boolean> => {
    return true;
  };

  const logout = () => {
    // No-op
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
