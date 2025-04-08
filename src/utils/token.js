// Token utility functions for handling JWT tokens
// In a real app, this would use a JWT library

import { verifyAuthToken } from '../services/api';

// Verify a JWT token
export const verifyToken = async (token) => {
  try {
    // In a real app, this would decode and validate the JWT locally
    // and then verify with the backend if needed
    
    // Call the API to verify the token
    const userData = await verifyAuthToken(token);
    return userData;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
};

// Parse JWT token (without verification)
export const parseToken = (token) => {
  try {
    // In a real app, this would use a JWT library to decode the token
    // For demo purposes, we'll simulate parsing a JWT
    
    // Split the token into parts (JWT format: header.payload.signature)
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    // Decode the payload (middle part)
    // In a real JWT, the payload is base64 encoded
    // Here we'll just return mock data
    
    return {
      did: 'did:radix:rd1qvde0w',
      walletAddress: 'rdx1qsp0jkap0n46q33wnj3vl0zmzuhqcdl5m3',
      exp: Date.now() + 86400000, // 24 hours from now
      iat: Date.now()
    };
  } catch (error) {
    console.error('Token parsing failed:', error);
    return null;
  }
};

// Check if a token is expired
export const isTokenExpired = (token) => {
  try {
    const tokenData = parseToken(token);
    
    if (!tokenData || !tokenData.exp) {
      return true;
    }
    
    // Check if current time is past expiration
    return Date.now() >= tokenData.exp;
  } catch (error) {
    console.error('Token expiration check failed:', error);
    return true;
  }
};