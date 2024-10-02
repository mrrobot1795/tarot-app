// app/api/interpretation/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Card = {
  name: string;
  // Add more properties if necessary
};

// Manually defining the message type based on OpenAI API
type ChatCompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type TarotRequest = {
  question: string;
  cards: Card[];
};

export async function POST(request: Request) {
  try {
    const body: TarotRequest = await request.json(); // Add explicit type
    const { question, cards } = body;

    // Generate messages for the ChatGPT model
    const messages = generateMessages(question, cards);

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    // Safely access the content, providing a fallback value if it's null or undefined
    const rawInterpretation =
      response.choices[0].message?.content?.trim() ??
      "No interpretation available";

    // Return the interpretation points as an array of strings
    return NextResponse.json({ interpretation: rawInterpretation });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the interpretation." },
      { status: 500 }
    );
  }
}

// Helper function to generate messages for ChatGPT
function generateMessages(
  question: string,
  cards: Card[]
): ChatCompletionMessage[] {
  const cardDescriptions = cards.map((card: Card) => `${card.name}`).join(", ");

  return [
    {
      role: "system",
      content: "You are a highly experienced tarot card reader.",
    },
    {
      role: "user",
      content: `Please provide three key points in a clear and numbered list for the following question: "${question}". The drawn cards are: ${cardDescriptions}. Explain how each card relates to the question and the querent's situation, offering insight and guidance.`,
    },
  ];
}
