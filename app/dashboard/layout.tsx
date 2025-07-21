'use client';

import { useProtectedRoute } from '@/lib/auth';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useProtectedRoute();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 ml-0 lg:ml-64 p-4 lg:p-6 mt-16 lg:mt-0"
      >
        {children}
      </motion.main>
    </div>
  );
}
