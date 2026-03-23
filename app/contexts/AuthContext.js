'use client';

import React, { createContext, useState, useContext, useLayoutEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage using useLayoutEffect (runs before paint)
  useLayoutEffect(() => {
    if (!isHydrated) {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setToken(savedToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      setIsHydrated(true);
    }
  }, [isHydrated]);

  const login = (email, password, role) => {
    // Mock JWT generation (in production, this would come from backend)
    const mockToken = btoa(JSON.stringify({ email, role, iat: Date.now() }));
    const userData = { id: Date.now(), email, role };
    
    setToken(mockToken);
    setUser(userData);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true, user: userData, token: mockToken };
  };

  const register = (email, password, name) => {
    const mockToken = btoa(JSON.stringify({ email, role: 'user', iat: Date.now() }));
    const userData = { id: Date.now(), email, name, role: 'user' };
    
    setToken(mockToken);
    setUser(userData);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true, user: userData, token: mockToken };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
