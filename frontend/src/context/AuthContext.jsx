import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('agricare_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  async function doLogin(email, password) {
    const { user: loggedInUser } = await api.login({ email, password });
    setUser(loggedInUser);
    localStorage.setItem('agricare_user', JSON.stringify(loggedInUser));
    return loggedInUser;
  }

  async function doRegister(name, email, password) {
    const { user: newUser } = await api.register({ name, email, password });
    setUser(newUser);
    localStorage.setItem('agricare_user', JSON.stringify(newUser));
    return newUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('agricare_user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login: doLogin, register: doRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
