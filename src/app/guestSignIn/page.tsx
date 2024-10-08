'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GuestSignIn() {
  const router = useRouter();

  const handleGuestLogin = () => {
    // Set guest status in localStorage
    localStorage.setItem('isGuest', 'true');

    // Redirect to the tarot reading page
    toast.success('Logged in as Guest! Redirecting...', {
      position: 'top-right',
      autoClose: 3000,
    });
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  useEffect(() => {
    // You could also use this effect to redirect if someone is already logged in as a guest
    if (localStorage.getItem('isGuest') === 'true') {
      router.push('/'); // If already signed in as guest, redirect to the reading page
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <ToastContainer />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In as Guest
        </h1>

        <button
          onClick={handleGuestLogin}
          className="py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all w-full mb-4"
        >
          Sign In as Guest
        </button>

        <p className="text-gray-500 text-sm">
          As a guest, you won’t be able to save or manage readings.
        </p>
      </div>
    </div>
  );
}
