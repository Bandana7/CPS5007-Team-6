// API service for communicating with the backend
// In a real app, this would make actual fetch/axios calls to your API endpoints

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.radixid.example';

// Helper for making API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  // Get auth token if available
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
  };
  
  // Add request body for non-GET requests with data
  if (method !== 'GET' && data) {
    config.body = JSON.stringify(data);
  }
  
  // In a real app, this would be a real API call
  // For demo purposes, we'll simulate API responses
  console.log(`API ${method} request to ${endpoint}:`, data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Handle different endpoints with mock responses
  switch (endpoint) {
    case '/auth/login':
      return mockLoginResponse(data);
    case '/auth/signup':
      return mockSignupResponse(data);
    case '/auth/verify-token':
      return mockTokenVerificationResponse(token);
    default:
      throw new Error(`Endpoint not implemented: ${endpoint}`);
  }
};

// Authentication API functions
export const loginWithCredentials = async (credentials) => {
  return apiRequest('/auth/login', 'POST', credentials);
};

export const signupWithCredentials = async (credentials) => {
  return apiRequest('/auth/signup', 'POST', credentials);
};

export const verifyAuthToken = async (token) => {
  return apiRequest('/auth/verify-token', 'POST', { token });
};

// Mock API responses for demo
const mockLoginResponse = (data) => {
  // Check if wallet address is provided
  if (!data.walletAddress) {
    throw new Error('Wallet address is required');
  }
  
  // Check if facial verification was completed
  if (!data.facialVerified) {
    throw new Error('Facial verification is required');
  }
  
  // Return mock user data and token
  return {
    token: 'mock_jwt_token_' + Math.random().toString(36).substring(2, 15),
    user: {
      did: `did:radix:${data.walletAddress.substring(0, 10)}`,
      walletAddress: data.walletAddress,
      displayName: 'Radix User',
    }
  };
};

const mockSignupResponse = (data) => {
  // Check if wallet address is provided
  if (!data.walletAddress) {
    throw new Error('Wallet address is required');
  }
  
  // Check if facial enrollment was completed
  if (!data.facialEnrolled) {
    throw new Error('Facial enrollment is required');
  }
  
  // Return mock user data and token
  return {
    token: 'mock_jwt_token_' + Math.random().toString(36).substring(2, 15),
    user: {
      did: `did:radix:${data.walletAddress.substring(0, 10)}`,
      walletAddress: data.walletAddress,
      displayName: 'Radix User',
      createdAt: new Date().toISOString(),
    }
  };
};

const mockTokenVerificationResponse = (token) => {
  // Check if token exists
  if (!token) {
    throw new Error('Invalid token');
  }
  
  // In a real app, this would decode and verify the JWT
  // For demo purposes, just return mock user data
  return {
    did: 'did:radix:rd1qvde0w',
    walletAddress: 'rdx1qsp0jkap0n46q33wnj3vl0zmzuhqcdl5m3',
    displayName: 'Radix User',
  };
};