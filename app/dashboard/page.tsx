'use client';

import { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import Chart from '../components/Chart';
import TransactionList from '../components/TransactionList';

interface Stats {
  currentMonth: {
    totalExpenses: number;
    totalIncome: number;
    netIncome: number;
    expensesByCategory: Record<string, number>;
    incomeByCategory: Record<string, number>;
  };
  recentTransactions: any[];
  monthlyTrend: any[];
  summary: {
    totalTransactions: number;
    averageExpense: number;
    averageIncome: number;
    savingsRate: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view dashboard');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">A quick overview of your finances</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Income" 
          amount={`$${stats.currentMonth.totalIncome.toFixed(2)}`} 
          color="green" 
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={`$${stats.currentMonth.totalExpenses.toFixed(2)}`} 
          color="red" 
        />
        <SummaryCard 
          title="Net Income" 
          amount={`$${stats.currentMonth.netIncome.toFixed(2)}`} 
          color={stats.currentMonth.netIncome >= 0 ? "blue" : "red"} 
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Savings Rate</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.currentMonth.totalIncome > 0 
              ? `${((stats.currentMonth.netIncome / stats.currentMonth.totalIncome) * 100).toFixed(1)}%`
              : '0%'
            }
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Expense</h3>
          <p className="text-2xl font-bold text-red-600">
            ${stats.summary.averageExpense.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${stats.summary.averageIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium text-gray-500">Transactions</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.summary.totalTransactions}
          </p>
        </div>
      </div>

      {/* Charts and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trend</h2>
          <Chart data={stats.monthlyTrend} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
          <TransactionList transactions={stats.recentTransactions} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Expense Categories</h2>
          <div className="space-y-3">
            {Object.entries(stats.currentMonth.expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{category}</span>
                <span className="font-semibold text-red-600">${amount.toFixed(2)}</span>
              </div>
            ))}
            {Object.keys(stats.currentMonth.expensesByCategory).length === 0 && (
              <p className="text-gray-500 text-center py-4">No expenses recorded yet</p>
            )}
          </div>
        </div>

        {/* Income Categories */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Income Categories</h2>
          <div className="space-y-3">
            {Object.entries(stats.currentMonth.incomeByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{category}</span>
                <span className="font-semibold text-green-600">${amount.toFixed(2)}</span>
              </div>
            ))}
            {Object.keys(stats.currentMonth.incomeByCategory).length === 0 && (
              <p className="text-gray-500 text-center py-4">No income recorded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
