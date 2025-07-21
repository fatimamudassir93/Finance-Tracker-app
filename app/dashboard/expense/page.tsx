'use client';

import { useState } from 'react';
import ExpenseForm from '../../components/ExpenseForm';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AddExpensePage() {
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    // Trigger a refresh of the dashboard data
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-6 space-y-6 bg-gradient-to-br from-white via-red-50 to-red-100 min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <PlusCircle className="text-red-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-md mx-auto"
      >
        <ExpenseForm 
          type="expense" 
          onSuccess={handleSuccess}
          key={refreshTrigger}
        />
      </motion.div>
    </motion.div>
  );
}
