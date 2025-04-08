import React, { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../utils/token';

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // Verify the token is valid
          const userData = await verifyToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          // Token is invalid or expired
          localStorage.removeItem('auth_token');
          setError('Your session has expired. Please log in again.');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (token, userData) => {
    try {
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Signup function (similar to login but may include additional steps)
  const signup = async (token, userData) => {
    try {
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Signup failed. Please try again.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};