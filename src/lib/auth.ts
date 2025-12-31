// Centralized auth utilities for enterprise-grade authentication
"use client";

import { API_ENDPOINTS } from './config';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
}

/**
 * Login user and store credentials securely
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || 'Login failed' };
    }

    // Store token in both cookie (for middleware) and localStorage (for client-side)
    // Backend returns 'accessToken', not 'token'
    const token = data.data?.accessToken || data.data?.token;
    
    if (token) {
      // Set cookie with security flags
      document.cookie = `adminToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
      
      // Also store in localStorage for backward compatibility
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(data.data.user));
    }

    return { success: true, data: data.data };
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

/**
 * Logout user and clear all credentials
 */
export function logout(): void {
  // Clear cookie
  document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  
  // Clear localStorage
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  
  // Redirect to login
  window.location.href = '/admin';
}

/**
 * Get current auth token
 */
export function getToken(): string | null {
  // Try cookie first (more secure)
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('adminToken='))
    ?.split('=')[1];
  
  if (cookieToken) return cookieToken;
  
  // Fallback to localStorage
  return localStorage.getItem('adminToken');
}

/**
 * Get current user data
 */
export function getUser(): User | null {
  const userData = localStorage.getItem('adminUser');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Verify token is still valid
 */
export async function verifyToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  try {
    const res = await fetch(API_ENDPOINTS.verify, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });

    if (!res.ok) {
      logout();
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Create authenticated fetch wrapper
 */
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}
