'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for sidebar open/close events
  useEffect(() => {
    const handler = (e: any) => {
      setSidebarOpen(!!e.detail);
    };
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);

  // Prevent flicker while loading auth state
  if (loading) return null;

  return (
    <nav className="w-full min-h-[3.5rem] bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 shadow-md border-b border-indigo-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between lg:ml-64 transition-all duration-300">
        {/* Logo / Brand */}
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          className={
            `text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-300 pl-4 pt-1 truncate ` +
            (sidebarOpen ? 'ml-56 transition-all duration-300' : '')
          }
          style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}
        >
          Personal Finance Tracker
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden sm:block">
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="text-gray-200 hover:text-white font-medium transition-colors duration-200"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-gray-200 hover:text-white font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Button */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-white text-indigo-800 font-semibold rounded-md hover:bg-indigo-100 transition-colors duration-300 shadow"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-indigo-800 font-semibold rounded-md hover:bg-indigo-100 transition-colors duration-300 shadow"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
