'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  userId: string;
}

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No transactions yet</p>
        <p className="text-gray-400 text-sm">Add some income or expenses to get started</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {transactions.map((tx, index) => (
        <motion.div
          key={tx._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200 border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {tx.description}
              </h3>
              <p className="text-sm text-gray-500 capitalize">
                {tx.category}
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="font-bold text-lg text-gray-800">
                {formatAmount(tx.amount)}
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(tx.date)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
