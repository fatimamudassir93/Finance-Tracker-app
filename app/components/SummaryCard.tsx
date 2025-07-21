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
      className={`bg-gradient-to-br ${colorMap[color]} text-white p-6 rounded-2xl shadow-md transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{amount}</p>
    </div>
  );
}
