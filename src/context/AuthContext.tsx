import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  phoneOrEmail: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (phoneOrEmail: string, name?: string) => void;
  register: (name: string, phoneOrEmail: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (phoneOrEmail: string, name?: string) => {
    const derivedName = name || (phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : phoneOrEmail);
    setUser({
      name: derivedName,
      phoneOrEmail,
    });
  };

  const register = (name: string, phoneOrEmail: string) => {
    setUser({
      name,
      phoneOrEmail,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
