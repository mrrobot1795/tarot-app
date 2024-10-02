'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [question, setQuestion] = useState('');

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToSignUp = () => {
    router.push('/signup');
  };

  const navigateToCRUD = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to manage Tarot readings!');
    } else {
      router.push('/crud');
    }
  };

  const navigateToReading = () => {
    if (!name || !birthDate || !question) {
      alert('Please fill in all fields to get a Tarot reading.');
      return;
    }
    router.push(
      `/reading?name=${encodeURIComponent(name)}&birthDate=${encodeURIComponent(
        birthDate
      )}&question=${encodeURIComponent(question)}`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false);
    router.push('/login'); // Redirect to login after logging out
  };

  return (
    <Container>
      <Title>Welcome to Tarot Card Reading App</Title>

      {!isLoggedIn ? (
        <>
          <Button onClick={navigateToLogin}>Login</Button>
          <Button onClick={navigateToSignUp}>Sign Up</Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Ask your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Button onClick={navigateToCRUD}>Manage Tarot Readings</Button>
          <Button onClick={navigateToReading}>Get Tarot Reading</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.div`
  background: linear-gradient(135deg, #1c1b29, #3d2c4d);
  color: #f5f5f5;
  padding: 50px;
  min-height: 100vh;
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #ffddc1;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid #ffddc1;
  background-color: #1c1b29;
  color: #fff;
  outline: none;

  &::placeholder {
    color: #ccc;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #ffddc1;
  color: #1c1b29;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px 0;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f7bfb4;
    box-shadow: 0 6px 15px rgba(255, 221, 193, 0.6);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;
