'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      toast.success('Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTimeout(() => {
        router.push('/reading'); // Redirect after login
      }, 3000);
    } else {
      toast.error('Login failed! Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <ToastContainer />
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Tarot Reading</h1>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-3 mb-4 w-full text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="p-3 mb-6 w-full text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        
        <button
          type="submit"
          className="py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}
