"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface Reading {
  _id: string;
  question: string;
  interpretation: string;
  createdAt: string;
}

// Component for managing Tarot Readings
export default function CrudPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/readings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReadings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching readings:", err);
        setError("Error fetching readings.");
        setLoading(false);
      }
    };

    fetchReadings();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      router.push("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      await axios.delete(`/api/readings?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReadings(readings.filter((reading) => reading._id !== id));
      toast.success("Reading deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error deleting reading:", err);
      setError("Error deleting reading.");
      toast.error("Error deleting reading.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-800 to-black min-h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="max-w-3xl w-full bg-white px-6 py-8 rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Manage Tarot Readings
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={navigateToHome}
            className="px-6 bg-purple-600 py-2 text-lg text-white font-bold rounded-md shadow-md hover:bg-green-600 transition-all"
          >
            Go to Home
          </button>
        </div>

        {loading && (
          <p className="text-lg text-gray-600 text-center">
            Loading readings...
          </p>
        )}

        {error && <p className="text-lg text-red-600 text-center">{error}</p>}

        {!loading && !error && readings.length > 0 && (
          <div className="space-y-6">
            {readings.map((reading) => (
              <div
                key={reading._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {reading.question}
                  </h3>
                  <button
                    onClick={() => handleDelete(reading._id)}
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-700 mb-4">
                  {" "}
                  {reading.interpretation.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                      <br />
                    </span>
                  ))}
                </p>
                <small className="text-gray-500">
                  {new Date(reading.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && readings.length === 0 && (
          <p className="text-lg text-gray-600 text-center mt-6">
            No readings available.
          </p>
        )}
      </div>
    </div>
  );
}
