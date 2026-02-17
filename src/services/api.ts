// API Service for ChemoVigi Backend Communication
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c55d007a`;

// Helper function to parse error messages
const parseErrorMessage = (error: any): string => {
  // Check for common error messages from backend
  if (error.message?.includes('fetch')) {
    return 'Unable to connect to server. Please check your internet connection and try again.';
  }
  
  if (error.message?.includes('Email not confirmed')) {
    return 'Please verify your email address before logging in. Check your inbox for the verification link.';
  }
  
  if (error.message?.includes('already exists') || error.message?.includes('already registered')) {
    return 'This email is already registered. Please use a different email or try logging in.';
  }
  
  if (error.message?.includes('Invalid credentials') || error.message?.includes('incorrect') || error.message?.includes('Invalid login')) {
    return 'Invalid email or password. Please verify your email first if you just registered.';
  }
  
  if (error.message?.includes('User not found')) {
    return 'No account found with this email. Please register first.';
  }
  
  return error.message || 'An unexpected error occurred. Please try again.';
};

// Register a new user (patient or clinician)
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'clinician';
  licenseNumber?: string;
  specialty?: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(parseErrorMessage(error));
  }
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
  role: 'patient' | 'clinician';
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(parseErrorMessage(error));
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  }
  return null;
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};