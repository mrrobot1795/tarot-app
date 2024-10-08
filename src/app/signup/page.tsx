"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      toast.success("Signup successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error("Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <ToastContainer />
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm flex flex-col"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="p-3 mb-4 w-full text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="p-3 mb-4 w-full text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="p-3 mb-6 w-full text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button
          type="submit"
          className="py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
