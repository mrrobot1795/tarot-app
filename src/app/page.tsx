"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [question, setQuestion] = useState("");

  // Check if the user is logged in or signed in as a guest when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const guest = localStorage.getItem("isGuest") === "true";
    setIsLoggedIn(!!token);
    setIsGuest(guest);
  }, []);

  const navigateToLogin = () => router.push("/login");
  const navigateToSignUp = () => router.push("/signup");
  const navigateToGuestSignIn = () => router.push("/guestSignIn");

  const navigateToCRUD = () =>
    !localStorage.getItem("token") && !localStorage.getItem("isGuest")
      ? alert("You must be logged in to manage Tarot readings!")
      : router.push("/crud");

  const navigateToReading = () => {
    if (!name || !birthDate || !question) {
      return alert("Please fill in all fields to get a Tarot reading.");
    }
    router.push(
      `/reading?name=${encodeURIComponent(name)}&birthDate=${encodeURIComponent(
        birthDate
      )}&question=${encodeURIComponent(question)}`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isGuest");
    setIsLoggedIn(false);
    setIsGuest(false);
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-pink-200 mb-8 text-center">
        Welcome to Tarot Card Reading App
      </h1>

      {!isLoggedIn && !isGuest ? (
        <div className="space-y-4 w-full max-w-sm">
          <button
            onClick={navigateToLogin}
            className="w-full py-3 text-lg bg-pink-200 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-300 transition-all"
          >
            Login
          </button>
          <button
            onClick={navigateToSignUp}
            className="w-full py-3 text-lg bg-pink-200 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-300 transition-all"
          >
            Sign Up
          </button>
          <button
            onClick={navigateToGuestSignIn}
            className="w-full py-3 text-lg bg-pink-200 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-300 transition-all"
          >
            Sign In as Guest
          </button>
        </div>
      ) : (
        <>
          <label
            className="w-full max-w-sm text-pink-200 mb-2 text-lg"
            htmlFor="name"
          >
            Enter your Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-sm py-3 px-4 mb-4 text-lg bg-gray-800 text-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <label
            className="w-full max-w-sm text-pink-200 mb-2 text-lg"
            htmlFor="birthDate"
          >
            Enter your birthdate:
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full max-w-sm py-3 px-4 mb-4 text-lg bg-gray-800 text-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <label
            className="w-full max-w-sm text-pink-200 mb-2 text-lg"
            htmlFor="question"
          >
            Ask your Question:
          </label>
          <input
            id="question"
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full max-w-sm py-3 px-4 mb-4 text-lg bg-gray-800 text-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <div className="space-y-4 w-full max-w-sm">
            {!isGuest && (
              <button
                onClick={navigateToCRUD}
                className="w-full py-3 text-lg bg-pink-200 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-300 transition-all"
              >
                Manage Tarot Readings
              </button>
            )}
            <button
              onClick={navigateToReading}
              className="w-full py-3 text-lg bg-pink-200 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-300 transition-all"
            >
              Get Tarot Reading
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 text-lg bg-pink-200 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-300 transition-all"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
