'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface AuthUser {
  username: string;
  displayName: string;
  email: string;
  profilePictureUrl: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setAuthenticated: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children,
  initialAuth,
  backendUrl,
}: {
  children: ReactNode;
  initialAuth: boolean;
  backendUrl: string;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(null);
      return;
    }

    fetch(`${backendUrl}/auth/me`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          setIsAuthenticated(false);
          setUser(null);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      });
  }, [isAuthenticated, backendUrl]);

  const setAuthenticated = useCallback((value: boolean) => {
    setIsAuthenticated(value);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
