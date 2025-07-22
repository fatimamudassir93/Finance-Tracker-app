// components/SummaryCard.tsx
import React from 'react';

type Props = {
  title: string;
  amount: string;
  color: 'green' | 'red' | 'blue';
};

const colorMap = {
  green: 'from-green-400 to-green-600',
  red: 'from-red-400 to-red-600',
  blue: 'from-blue-400 to-blue-600',
};

export default function SummaryCard({ title, amount, color }: Props) {
  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} text-white p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white/20`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{amount}</p>
    </div>
  );
}
