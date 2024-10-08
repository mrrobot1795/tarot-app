"use client";

import React, { useState } from "react";
import { TarotCard } from "../data/tarotCards";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

type Props = {
  tarotCards: TarotCard[];
  selectedCards: TarotCard[];
  onSelect: (card: TarotCard) => void;
  onShuffle: () => void;
};

const CardAnimation: React.FC<Props> = ({
  tarotCards,
  selectedCards,
  onSelect,
  onShuffle,
}) => {
  const deckIsEmpty = tarotCards.length === 0;
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      onShuffle();
      setIsShuffling(false);
    }, 5000);
  };

  const shuffleVariants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      opacity: 1,
      x: 90,
      y: 50,
      rotate: (i % 2 === 0 ? 1 : -1) * Math.random() * 9,
      transition: {
        delay: i * 0.09,
        duration: 0.9,
        ease: "easeInOut",
      },
    }),
    normal: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 0.9, ease: "easeInOut" },
    },
  };

  const fallVariants = {
    hidden: { opacity: 0, y: -300 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 5 },
    },
  };

  const handleSelectCard = () => {
    if (tarotCards.length > 0 && !isShuffling) {
      onSelect(tarotCards[0]);
    }
  };

  return (
    <Container>
      <ShuffleButton onClick={handleShuffle} disabled={isShuffling}>
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </ShuffleButton>

      <DeckContainer>
        <AnimatePresence>
          {!deckIsEmpty &&
            tarotCards.map((card, index) => (
              <DeckWrapper
                key={card.id}
                onClick={handleSelectCard}
                custom={index}
                variants={shuffleVariants}
                initial={isShuffling ? "hidden" : "normal"}
                animate={isShuffling ? "show" : "normal"}
                exit="hidden"
                style={{
                  zIndex: tarotCards.length - index,
                  top: `${index * 0.3}px`,
                  left: `${index * 0.3}px`,
                }}
              >
                <CardInner>
                  <CardFront />
                </CardInner>
              </DeckWrapper>
            ))}
        </AnimatePresence>
      </DeckContainer>

      {deckIsEmpty && <p>The deck is empty!</p>}

      <DrawnCardsContainer>
        {selectedCards.map((card) => (
          <motion.div
            key={card.id}
            variants={fallVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <DrawnCardWrapper>
              <CardBack>
                <CardImage src={card.image} alt={card.name} />
                <CardName>{card.name}</CardName>
              </CardBack>
            </DrawnCardWrapper>
          </motion.div>
        ))}
      </DrawnCardsContainer>
    </Container>
  );
};

export default CardAnimation;

const Container = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const DeckContainer = styled.div`
  position: relative;
  width: 120px;
  height: 180px;
  margin: 40px auto 60px;
  cursor: pointer;
`;

const DeckWrapper = styled(motion.div)`
  position: absolute;
  width: 120px;
  height: 180px;
  cursor: pointer;
  perspective: 1000px;
  &:hover {
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
  border-radius: 8px;
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  background: url("/cards/card-back.jpg") no-repeat center/cover;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
`;

const DrawnCardsContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const DrawnCardWrapper = styled.div`
  width: 90px;
  height: 140px;
`;

const CardBack = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const CardImage = styled.img`
  width: 90%;
  height: 65%;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CardName = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #333;
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const ShuffleButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #6b4d9f;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #8a65c5;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
