'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function IncomeForm() {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // TODO: Replace with backend integration
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-indigo-700">Add New Income</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Income Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
          placeholder="e.g., Freelance Work"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount ($)
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
          placeholder="e.g., 200"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
        >
          <option value="">Select a category</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investments">Investments</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium font-poppins text-gray-700">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-semibold font-poppins rounded-md"
      >
        Add Income
      </Button>
    </form>
  );
}
