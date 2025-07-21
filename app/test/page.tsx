'use client';

import { useState } from 'react';

export default function TestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAPI = async (endpoint: string, method: string = 'GET', body?: any) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(endpoint, options);
      const data = await response.json();
      
      addResult(`${method} ${endpoint}: ${response.status} - ${JSON.stringify(data)}`);
      return { success: response.ok, data };
    } catch (error) {
      addResult(`Error ${method} ${endpoint}: ${error}`);
      return { success: false, error };
    }
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    addResult('Starting API tests...');

    // Test 1: Register a new user
    addResult('Test 1: Registering new user...');
    const registerResult = await testAPI('/api/auth/register', 'POST', {
      email: 'test@example.com',
      password: 'password123'
    });

    if (registerResult.success) {
      addResult('Registration successful!');
      
      // Test 2: Login with the user
      addResult('Test 2: Logging in...');
      const loginResult = await testAPI('/api/auth/login', 'POST', {
        email: 'test@example.com',
        password: 'password123'
      });

      if (loginResult.success && loginResult.data.token) {
        addResult('Login successful! Token received.');
        
        // Test 3: Add an expense
        addResult('Test 3: Adding expense...');
        const expenseResult = await testAPI('/api/expenses', 'POST', {
          amount: 50.00,
          description: 'Test expense',
          category: 'Food',
          date: new Date().toISOString()
        }, loginResult.data.token);

        if (expenseResult.success) {
          addResult('Expense added successfully!');
          
          // Test 4: Fetch expenses
          addResult('Test 4: Fetching expenses...');
          await testAPI('/api/expenses', 'GET', null, loginResult.data.token);
        }
      } else {
        addResult('Login failed!');
      }
    } else {
      addResult('Registration failed!');
    }

    addResult('Tests completed!');
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={runTests}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Running Tests...' : 'Run All Tests'}
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Clear Results
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="bg-gray-100 rounded p-4 h-96 overflow-y-auto font-mono text-sm">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No test results yet. Click "Run All Tests" to start.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2">
            <p><strong>MONGODB_URI:</strong> {process.env.NEXT_PUBLIC_MONGODB_URI ? 'Set' : 'Not set'}</p>
            <p><strong>JWT_SECRET:</strong> {process.env.NEXT_PUBLIC_JWT_SECRET ? 'Set' : 'Not set'}</p>
            <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 