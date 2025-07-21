'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-6"
    >
      {/* Home Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full max-w-4xl mb-8"
      >
        <Image
          src="/home.png"
          alt="Personal Finance Tracker"
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg shadow-lg"
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 text-center"
      >
        Welcome to <span className="text-purple-600">Personal Finance Tracker</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-600 mb-6 text-center max-w-md"
      >
        Track your expenses, manage income, and gain insightful control over your finances.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded-2xl shadow hover:bg-indigo-700 transition-all duration-300 text-center"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-2xl shadow hover:bg-indigo-50 transition-all duration-300 text-center"
        >
          Sign Up
        </Link>
      </motion.div>
    </motion.div>
  );
}
