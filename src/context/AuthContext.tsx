import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';

interface AuthContextProps {
  user: string | null;
  login: (u: string, p: string, remember?: boolean) => Promise<void>;
  register: (u: string, p: string, e?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const login = async (username: string, password: string, remember = true) => {
    await auth.login(username, password, remember);
    setUser(auth.getCurrentUser());
  };

  const registerUser = async (username: string, password: string, email?: string) => {
    await auth.register(username, password, email);
    setUser(auth.getCurrentUser());
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register: registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
