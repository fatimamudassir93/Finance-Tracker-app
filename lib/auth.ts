'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Cross-tab logout sync and token change detection
  useEffect(() => {
    let prevToken = localStorage.getItem('token');
    setIsAuthenticated(!!prevToken);
    setLoading(false);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'token') {
        setIsAuthenticated(!!event.newValue);
        if (event.newValue === null) {
          router.push('/login');
        }
      }
    };
    window.addEventListener('storage', handleStorage);

    // Polling fallback for same-tab token changes
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== prevToken) {
        setIsAuthenticated(!!currentToken);
        prevToken = currentToken;
        if (!currentToken) {
          router.push('/login');
        }
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [router]);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
  };
}

export function useProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  return { isAuthenticated, loading };
}

// Helper: fetch wrapper that logs out on 401
export async function authFetch(input: RequestInfo, init: RequestInit = {}, logoutCallback?: () => void) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = {
    ...(init.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
  const response = await fetch(input, { ...init, headers });
  if (response.status === 401) {
    if (logoutCallback) logoutCallback();
    else if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }
  return response;
} 