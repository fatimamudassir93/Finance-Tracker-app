'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 shadow-md border-b border-indigo-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-300"
        >
          Personal Finance Tracker
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden sm:block">
          <Link
            href="/"
            className="text-gray-200 hover:text-white font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-200 hover:text-white font-medium transition-colors duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="px-4 py-2 bg-white text-indigo-800 font-semibold rounded-md hover:bg-indigo-100 transition-colors duration-300 shadow"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
