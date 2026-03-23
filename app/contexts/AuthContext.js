'use client';

import React, { createContext, useState, useContext, useLayoutEffect } from 'react';
import { mockUsers } from '../lib/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  const ensureDefaultUsers = (currentUsers = []) => {
    const normalized = [...currentUsers];
    Object.entries(mockUsers).forEach(([email, data], index) => {
      const existing = normalized.find((u) => u.email === email);
      if (!existing) {
        normalized.push({
          id: Date.now() + index + Math.random(),
          email,
          ...data,
        });
      }
    });
    return normalized;
  };

  // Initialize from localStorage using useLayoutEffect (runs before paint)
  useLayoutEffect(() => {
    if (!isHydrated) {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      const savedUsers = localStorage.getItem('users');

      if (savedUsers) {
        try {
          const parsedUsers = JSON.parse(savedUsers);
          const finalUsers = ensureDefaultUsers(parsedUsers);
          setUsers(finalUsers);
          localStorage.setItem('users', JSON.stringify(finalUsers));
        } catch (error) {
          const mockUsersArray = ensureDefaultUsers();
          setUsers(mockUsersArray);
          localStorage.setItem('users', JSON.stringify(mockUsersArray));
        }
      } else {
        const mockUsersArray = ensureDefaultUsers();
        setUsers(mockUsersArray);
        localStorage.setItem('users', JSON.stringify(mockUsersArray));
      }

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }

      setLoading(false);
      setIsHydrated(true);
    }
  }, [isHydrated]);

  const login = (email, password, role) => {
    if (!isHydrated) {
      return { success: false, message: 'System initializing, please wait a moment and try again.' };
    }

    // Validate user from saved users only
    const matchingUser = users.find((u) => u.email === email && u.password === password && u.role === role);

    if (!matchingUser) {
      return { success: false, message: 'Invalid email, password, or role. Please register first.' };
    }

    const mockToken = btoa(JSON.stringify({ email, role, iat: Date.now() }));
    const userData = { id: matchingUser.id, email: matchingUser.email, name: matchingUser.name, role: matchingUser.role };

    setToken(mockToken);
    setUser(userData);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(userData));

    return { success: true, user: userData, token: mockToken };
  };

  const register = (email, password, name) => {
    // Do not allow duplicate email registration
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser = { id: Date.now(), email, password, name, role: 'user' };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const mockToken = btoa(JSON.stringify({ email, role: 'user', iat: Date.now() }));
    const userData = { id: newUser.id, email, name, role: 'user' };

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
    <AuthContext.Provider value={{ user, token, loading, isHydrated, login, register, logout, isAuthenticated, isAdmin, isUser }}>
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
