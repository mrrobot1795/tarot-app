"use client";

import React, { useState, useEffect } from 'react';
import { TarotCard } from '../data/tarotCards';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  drawnCards: TarotCard[];
};

const CardAnimation: React.FC<Props> = ({ drawnCards }) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    drawnCards.forEach((card, index) => {
      setTimeout(() => {
        setFlippedCards((prev) => [...prev, card.id]);
      }, (index + 1) * 1000);
    });
  }, [drawnCards]);

  return (
    <Container>
      {drawnCards.map((card) => {
        const isFlipped = flippedCards.includes(card.id);
        return (
          <CardWrapper key={card.id}>
            <CardInner
              animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.05 : 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <CardFront />
              <CardBack>
                <CardImage src={card.image} alt={card.name} />
                <CardName>{card.name}</CardName>
              </CardBack>
            </CardInner>
          </CardWrapper>
        );
      })}
    </Container>
  );
};

export default CardAnimation;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 20px; /* Add space between the cards */
  flex-wrap: wrap; /* Allow cards to wrap on smaller screens */
`;

const CardWrapper = styled.div`
  width: 150px;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;

  &:hover {
    /* Slight scale on hover */
    transform: scale(1.05);
  }
`;

const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.8);
  }
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 12px;
`;

const CardFront = styled(CardFace)`
  background: url('/cards/card-back.jpg') no-repeat center/cover;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3); /* Adds shadow to give a 3D depth */
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CardName = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 10px;
  font-family: 'Playfair Display', serif; /* Use a more mystical font for the card names */
`;
