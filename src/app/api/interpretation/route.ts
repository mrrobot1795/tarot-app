// app/api/interpretation/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Card = {
  name: string;
};

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
    const body: TarotRequest = await request.json();
    const { question, cards } = body;
    const messages = generateMessages(question, cards);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });
    const rawInterpretation =
      response.choices[0].message?.content?.trim() ??
      "No interpretation available";

    return NextResponse.json({ interpretation: rawInterpretation });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the interpretation." },
      { status: 500 }
    );
  }
}

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
