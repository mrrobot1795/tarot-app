'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the types for a Reading
interface Reading {
  _id: string; // Use _id for MongoDB's document ID
  question: string;
  interpretation: string;
  createdAt: string;
}

// Component for managing Tarot Readings
export default function CrudPage() {
  const [readings, setReadings] = useState<Reading[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch readings from the API
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/readings", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        setReadings(response.data); // Set the response data directly
        setLoading(false);
      } catch (err) {
        console.error("Error fetching readings:", err);
        setError("Error fetching readings.");
        setLoading(false);
      }
    };

    fetchReadings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required.", {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      await axios.delete(`/api/readings?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      // Update the state to remove the deleted reading
      setReadings(readings.filter((reading) => reading._id !== id));
      toast.success("Reading deleted successfully!", {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error deleting reading:", err);
      setError("Error deleting reading.");
      toast.error("Error deleting reading.", {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h1>Manage Tarot Readings</h1>

      {loading && <LoadingMessage>Loading readings...</LoadingMessage>}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && readings.length > 0 && (
        <ReadingList>
          {readings.map((reading) => (
            <ReadingItem key={reading._id}>
              <ReadingHeader>
                <h3>{reading.question}</h3>
                <Button onClick={() => handleDelete(reading._id)}>Delete</Button>
              </ReadingHeader>
              <p>{reading.interpretation}</p>
              <small>{new Date(reading.createdAt).toLocaleString()}</small>
            </ReadingItem>
          ))}
        </ReadingList>
      )}

      {!loading && !error && readings.length === 0 && (
        <NoReadingsMessage>No readings available.</NoReadingsMessage>
      )}
    </Container>
  );
}

// Styled components

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  text-align: center;
`;

const ReadingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReadingItem = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const ReadingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    font-size: 20px;
    margin: 0;
    color: #333;
  }

  button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d63b32;
    }
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: #e74c3c;
`;

const NoReadingsMessage = styled.p`
  font-size: 18px;
  color: #999;
  margin-top: 20px;
`;

