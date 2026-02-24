'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children,
  initialAuth,
}: {
  children: ReactNode;
  initialAuth: boolean;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);

  const setAuthenticated = useCallback((value: boolean) => {
    setIsAuthenticated(value);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext value={{ isAuthenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext>
  );
}
