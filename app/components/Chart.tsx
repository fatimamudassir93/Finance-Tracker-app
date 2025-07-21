'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

import { motion } from 'framer-motion';

interface ChartData {
  month: string;
  expenses: number;
  income: number;
  net: number;
}

interface ChartProps {
  data?: ChartData[];
}

export default function Chart({ data = [] }: ChartProps) {
  // If no data provided, show empty state
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-80 rounded-xl p-4 shadow-md bg-gradient-to-br from-white/80 to-purple-100 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-gray-500 text-lg">No data available</p>
          <p className="text-gray-400 text-sm">Add some transactions to see your trends</p>
        </div>
      </motion.div>
    );
  }

  // Transform data for the chart
  const chartData = data.map(item => ({
    name: item.month,
    income: item.income,
    expenses: item.expenses,
    net: item.net
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full h-80 rounded-xl p-4 shadow-md bg-gradient-to-br from-white/80 to-purple-100 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `$${value.toFixed(2)}`, 
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
            labelStyle={{ color: '#374151' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#22c55e" 
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke="#3b82f6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
