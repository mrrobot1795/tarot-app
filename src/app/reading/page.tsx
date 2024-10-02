'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { TarotCard, tarotCards } from "../../data/tarotCards";
import CardAnimation from "@/compoents/CardAnimation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ReadingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "";
  const birthDate = searchParams.get("birthDate") || "";
  const question = searchParams.get("question") || "";

  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [interpretation, setInterpretation] = useState<string>(""); // Use string for full interpretation
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false); // To track if reading is saved

  useEffect(() => {
    if (!question) {
      router.push("/");
    } else {
      const shuffledCards = [...tarotCards].sort(() => 0.5 - Math.random());
      const selectedCards = shuffledCards.slice(0, 3);
      setDrawnCards(selectedCards);
    }
  }, [question, router]);

  useEffect(() => {
    if (drawnCards.length === 3) {
      const fetchInterpretation = async () => {
        setLoading(true);
        try {
          const response = await fetch("/api/interpretation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question,
              cards: drawnCards,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            // Ensure the response is cleanly formatted
            setInterpretation(data.interpretation.replace(/\n+/g, "\n").trim());
          } else {
            console.error("Error fetching interpretation:", data.error);
            setInterpretation(
              "An error occurred while fetching the interpretation."
            );
          }
        } catch (error) {
          console.error("Error:", error);
          setInterpretation(
            "An error occurred while fetching the interpretation."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchInterpretation();
    }
  }, [drawnCards, question]);

  // Function to save the reading to the database
  const handleSaveReading = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        alert("You must be logged in to save a reading.");
        return;
      }

      const response = await axios.post(
        "/api/readings",
        {
          question,
          cards: drawnCards.map((card) => card.name), // Convert drawnCards to string names
          interpretation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      if (response.status === 201) {
        // Change to 201 because that's the created status in your backend
        setIsSaved(true); // Mark as saved
        toast.success("Reading saved successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving reading:", error);
      toast.error("An error occurred while saving the reading.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Function to navigate to the Manage Readings page
  const goToManageReadings = () => {
    router.push('/crud'); // Redirect to the CRUD page for managing readings
  };

  return (
    <Container>
      <ToastContainer />
      <Title>Your Tarot Reading</Title>
      {name && <UserInfo>Name: {name}</UserInfo>}
      {birthDate && <UserInfo>Birth Date: {birthDate}</UserInfo>}
      <Subtitle>Question: {question}</Subtitle>
      <CardAnimation drawnCards={drawnCards} />
      {loading ? (
        <LoadingMessage>Loading interpretation...</LoadingMessage>
      ) : (
        interpretation && (
          <>
            <Interpretation>
              <h2>Interpretation:</h2>
              <FormattedInterpretation>
                {interpretation.split("\n").map((point, index) => (
                  <p key={index}>{point.trim()}</p>
                ))}
              </FormattedInterpretation>
            </Interpretation>
            {!isSaved && (
              <SaveButton onClick={handleSaveReading}>Save Reading</SaveButton>
            )}
            {isSaved && (
              <>
                <SuccessMessage>Reading saved successfully!</SuccessMessage>
                <ManageButton onClick={goToManageReadings}>
                  Manage Readings
                </ManageButton>
              </>
            )}
          </>
        )
      )}
    </Container>
  );
}

// Styled components

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  margin-bottom: 40px;
`;

const UserInfo = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Interpretation = styled.div`
  margin-top: 40px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FormattedInterpretation = styled.div`
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
`;

const LoadingMessage = styled.p`
  margin-top: 40px;
  font-style: italic;
`;

const SaveButton = styled.button`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const ManageButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  margin-top: 20px;
  color: #4caf50;
  font-weight: bold;
`;
