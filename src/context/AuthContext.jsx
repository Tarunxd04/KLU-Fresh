import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, ADMIN_ACCOUNTS } from '../utils/constants';
import {
  authReadJSON,
  authWriteJSON,
  demoObfuscatePassword,
  isValidEmail,
  getStoredUsers,
  saveStoredUsers,
  makeUserId,
} from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return authReadJSON(STORAGE_KEYS.CURRENT_USER, null);
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin' && localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';

  const register = useCallback(({ name, email, password, confirmPassword }) => {
    name = (name || '').trim();
    email = (email || '').trim().toLowerCase();
    password = password || '';
    confirmPassword = confirmPassword || '';

    if (!name || !email || !password || !confirmPassword) {
      return { success: false, message: 'Please fill in all fields.' };
    }
    if (!isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (ADMIN_ACCOUNTS.some((a) => a.email.toLowerCase() === email)) {
      return { success: false, message: 'This email is reserved for system administrator.' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }

    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: makeUserId(),
      name,
      email,
      password: demoObfuscatePassword(password),
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveStoredUsers(users);

    return {
      success: true,
      message: 'Account created successfully! Welcome to KLU Fresh.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user' },
    };
  }, []);

  const login = useCallback(({ email, password, roleMode = 'user' }) => {
    email = (email || '').trim().toLowerCase();
    password = password || '';

    if (roleMode === 'admin') {
      if (!email || !password) {
        return { success: false, message: 'Please enter both Admin email and password.' };
      }

      const adminMatch = ADMIN_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email && a.password === password
      );

      if (adminMatch) {
        const adminSession = {
          id: adminMatch.id,
          name: adminMatch.name,
          email: adminMatch.email,
          role: 'admin',
        };
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
        authWriteJSON(STORAGE_KEYS.CURRENT_USER, adminSession);
        setUser(adminSession);
        return {
          success: true,
          message: 'Admin authentication successful!',
          user: adminSession,
        };
      }

      return { success: false, message: 'Invalid Admin credentials.' };
    }

    // Customer Login
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    const users = getStoredUsers();
    const match = users.find((u) => u.email === email);

    if (!match || match.password !== demoObfuscatePassword(password)) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const sessionUser = {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role || 'user',
    };
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    authWriteJSON(STORAGE_KEYS.CURRENT_USER, sessionUser);
    setUser(sessionUser);

    return {
      success: true,
      message: `Welcome back, ${match.name.split(' ')[0]}!`,
      user: sessionUser,
    };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
