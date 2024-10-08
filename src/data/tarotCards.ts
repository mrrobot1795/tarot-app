// data/tarotCards.ts

export type TarotCard = {
  id: number;
  name: string;
  image: string;
};

export const tarotCards: TarotCard[] = [
  // Major Arcana
  { id: 0, name: "The Fool", image: "/cards/RWS_Tarot_00_Fool.jpg" },
  { id: 1, name: "The Magician", image: "/cards/RWS_Tarot_01_Magician.jpg" },
  {
    id: 2,
    name: "The High Priestess",
    image: "/cards/RWS_Tarot_02_High_Priestess.jpg",
  },
  { id: 3, name: "The Empress", image: "/cards/RWS_Tarot_03_Empress.jpg" },
  { id: 4, name: "The Emperor", image: "/cards/RWS_Tarot_04_Emperor.jpg" },
  {
    id: 5,
    name: "The Hierophant",
    image: "/cards/RWS_Tarot_05_Hierophant.jpg",
  },
  { id: 6, name: "The Lovers", image: "/cards/RWS_Tarot_06_Lovers.jpg" },
  { id: 7, name: "The Chariot", image: "/cards/RWS_Tarot_07_Chariot.jpg" },
  { id: 8, name: "Strength", image: "/cards/RWS_Tarot_08_Strength.jpg" },
  { id: 9, name: "The Hermit", image: "/cards/RWS_Tarot_09_Hermit.jpg" },
  {
    id: 10,
    name: "Wheel of Fortune",
    image: "/cards/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  },
  { id: 11, name: "Justice", image: "/cards/RWS_Tarot_11_Justice.jpg" },
  {
    id: 12,
    name: "The Hanged Man",
    image: "/cards/RWS_Tarot_12_Hanged_Man.jpg",
  },
  { id: 13, name: "Death", image: "/cards/RWS_Tarot_13_Death.jpg" },
  { id: 14, name: "Temperance", image: "/cards/RWS_Tarot_14_Temperance.jpg" },
  { id: 15, name: "The Devil", image: "/cards/RWS_Tarot_15_Devil.jpg" },
  { id: 16, name: "The Tower", image: "/cards/RWS_Tarot_16_Tower.jpg" },
  { id: 17, name: "The Star", image: "/cards/RWS_Tarot_17_Star.jpg" },
  { id: 18, name: "The Moon", image: "/cards/RWS_Tarot_18_Moon.jpg" },
  { id: 19, name: "The Sun", image: "/cards/RWS_Tarot_19_Sun.jpg" },
  { id: 20, name: "Judgement", image: "/cards/RWS_Tarot_20_Judgement.jpg" },
  { id: 21, name: "The World", image: "/cards/RWS_Tarot_21_World.jpg" },

  // Minor Arcana - Wands
  { id: 22, name: "Ace of Wands", image: "/cards/Wands01.jpg" },
  { id: 23, name: "Two of Wands", image: "/cards/Wands02.jpg" },
  { id: 24, name: "Three of Wands", image: "/cards/Wands03.jpg" },
  { id: 25, name: "Four of Wands", image: "/cards/Wands04.jpg" },
  { id: 26, name: "Five of Wands", image: "/cards/Wands05.jpg" },
  { id: 27, name: "Six of Wands", image: "/cards/Wands06.jpg" },
  { id: 28, name: "Seven of Wands", image: "/cards/Wands07.jpg" },
  { id: 29, name: "Eight of Wands", image: "/cards/Wands08.jpg" },
  { id: 30, name: "Nine of Wands", image: "/cards/Tarot_Nine_of_Wands.jpg" },
  { id: 31, name: "Ten of Wands", image: "/cards/Wands10.jpg" },
  { id: 32, name: "Page of Wands", image: "/cards/Wands11.jpg" },
  { id: 33, name: "Knight of Wands", image: "/cards/Wands12.jpg" },
  { id: 34, name: "Queen of Wands", image: "/cards/Wands13.jpg" },
  { id: 35, name: "King of Wands", image: "/cards/Wands14.jpg" },

  // Minor Arcana - Cups
  { id: 36, name: "Ace of Cups", image: "/cards/Cups01.jpg" },
  { id: 37, name: "Two of Cups", image: "/cards/Cups02.jpg" },
  { id: 38, name: "Three of Cups", image: "/cards/Cups03.jpg" },
  { id: 39, name: "Four of Cups", image: "/cards/Cups04.jpg" },
  { id: 40, name: "Five of Cups", image: "/cards/Cups05.jpg" },
  { id: 41, name: "Six of Cups", image: "/cards/Cups06.jpg" },
  { id: 42, name: "Seven of Cups", image: "/cards/Cups07.jpg" },
  { id: 43, name: "Eight of Cups", image: "/cards/Cups08.jpg" },
  { id: 44, name: "Nine of Cups", image: "/cards/Cups09.jpg" },
  { id: 45, name: "Ten of Cups", image: "/cards/Cups10.jpg" },
  { id: 46, name: "Page of Cups", image: "/cards/Cups11.jpg" },
  { id: 47, name: "Knight of Cups", image: "/cards/Cups12.jpg" },
  { id: 48, name: "Queen of Cups", image: "/cards/Cups13.jpg" },
  { id: 49, name: "King of Cups", image: "/cards/Cups14.jpg" },

  // Minor Arcana - Swords
  { id: 50, name: "Ace of Swords", image: "/cards/Swords01.jpg" },
  { id: 51, name: "Two of Swords", image: "/cards/Swords02.jpg" },
  { id: 52, name: "Three of Swords", image: "/cards/Swords03.jpg" },
  { id: 53, name: "Four of Swords", image: "/cards/Swords04.jpg" },
  { id: 54, name: "Five of Swords", image: "/cards/Swords05.jpg" },
  { id: 55, name: "Six of Swords", image: "/cards/Swords06.jpg" },
  { id: 56, name: "Seven of Swords", image: "/cards/Swords07.jpg" },
  { id: 57, name: "Eight of Swords", image: "/cards/Swords08.jpg" },
  { id: 58, name: "Nine of Swords", image: "/cards/Swords09.jpg" },
  { id: 59, name: "Ten of Swords", image: "/cards/Swords10.jpg" },
  { id: 60, name: "Page of Swords", image: "/cards/Swords11.jpg" },
  { id: 61, name: "Knight of Swords", image: "/cards/Swords12.jpg" },
  { id: 62, name: "Queen of Swords", image: "/cards/Swords13.jpg" },
  { id: 63, name: "King of Swords", image: "/cards/Swords14.jpg" },

  // Minor Arcana - Pentacles (Coins)
  {
    id: 64,
    name: "Ace of Pentacles",
    image: "/cards/Pents01.jpg",
  },
  {
    id: 65,
    name: "Two of Pentacles",
    image: "/cards/Pents02.jpg",
  },
  {
    id: 66,
    name: "Three of Pentacles",
    image: "/cards/Pents03.jpg",
  },
  {
    id: 67,
    name: "Four of Pentacles",
    image: "/cards/Pents04.jpg",
  },
  {
    id: 68,
    name: "Five of Pentacles",
    image: "/cards/Pents05.jpg",
  },
  {
    id: 69,
    name: "Six of Pentacles",
    image: "/cards/Pents06.jpg",
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    image: "/cards/Pents07.jpg",
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    image: "/cards/Pents08.jpg",
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    image: "/cards/Pents09.jpg",
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    image: "/cards/Pents10.jpg",
  },
  {
    id: 74,
    name: "Page of Pentacles",
    image: "/cards/Pents11.jpg",
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    image: "/cards/Pents12.jpg",
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    image: "/cards/Pents13.jpg",
  },
  {
    id: 77,
    name: "King of Pentacles",
    image: "/cards/Pents14.jpg",
  },
  { id: 78, name: "card-back", image: "/cards/card-back.jpg" },
];
