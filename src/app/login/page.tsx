'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
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
    <LoginContainer>
      <ToastContainer />
      <LoginForm onSubmit={handleLogin}>
        <Title>Login to Tarot Reading</Title>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
}

// Styled components

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1c1b29, #3d2c4d);
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #3d2c4d;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #3d2c4d;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  width: 100%;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
