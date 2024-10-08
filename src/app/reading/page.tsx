"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TarotCard,
  tarotCards as initialTarotCards,
} from "../../data/tarotCards";
import CardAnimation from "@/compoents/CardAnimation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReadingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "";
  const birthDate = searchParams.get("birthDate") || "";
  const question = searchParams.get("question") || "";

  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [interpretation, setInterpretation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guest = localStorage.getItem("isGuest") === "true";
    if (!token && !guest) {
      router.push("/login");
    } else if (guest) {
      setIsGuest(true);
    }
  }, [router]);

  const handleShuffleDeck = () => {
    const shuffledDeck = [...initialTarotCards].sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
  };

  const handleDrawCard = (card: TarotCard) => {
    if (selectedCards.length < 3) {
      setSelectedCards((prev) => [...prev, card]);
      setDeck((prev) => prev.slice(1));
    }
  };

  useEffect(() => {
    if (selectedCards.length === 3) {
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
              cards: selectedCards,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            setInterpretation(data.interpretation.replace(/\n+/g, "\n").trim());
          } else {
            setInterpretation(
              "An error occurred while fetching the interpretation."
            );
          }
        } catch (error) {
          console.error("Error Occured:", error);
          setInterpretation(
            "An error occurred while fetching the interpretation."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchInterpretation();
    }
  }, [selectedCards, question]);

  const handleSaveReading = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to save a reading.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.post(
        "/api/readings",
        {
          question,
          cards: selectedCards.map((card) => card.name),
          interpretation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setIsSaved(true);
        toast.success("Reading saved successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while saving the reading.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const goToManageReadings = () => {
    router.push("/crud");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white text-center py-8 px-4">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Select Your Cards
        </h1>
        {name && <p className="text-lg font-semibold mb-2">Name: {name}</p>}
        {birthDate && (
          <p className="text-lg font-semibold mb-4">Birth Date: {birthDate}</p>
        )}
        <h2 className="text-xl md:text-2xl mb-6">Question: {question}</h2>

        <CardAnimation
          tarotCards={deck}
          selectedCards={selectedCards}
          onSelect={handleDrawCard}
          onShuffle={handleShuffleDeck}
        />

        {selectedCards.length === 3 && (
          <>
            {loading ? (
              <p className="italic text-lg mt-6">Loading interpretation...</p>
            ) : (
              interpretation && (
                <>
                  <div className="mt-6 bg-white text-black p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Interpretation:</h2>
                    <div className="text-left">
                      {interpretation.split("\n").map((point, index) => (
                        <p key={index} className="mb-3 text-gray-700">
                          {point.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                  {!isGuest && !isSaved && (
                    <button
                      onClick={handleSaveReading}
                      className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                    >
                      Save Reading
                    </button>
                  )}
                  {!isGuest && isSaved && (
                    <>
                      <p className="text-green-500 font-semibold mt-6">
                        Reading saved successfully!
                      </p>
                      <button
                        onClick={goToManageReadings}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                      >
                        Manage Readings
                      </button>
                    </>
                  )}
                </>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ReadingPage() {
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <ReadingContent />
    </Suspense>
  );
}
