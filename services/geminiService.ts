import { GoogleGenAI } from "@google/genai";
import { CARS } from "../constants";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real app, never expose API keys. This is for the demo context.
// Assuming the user runs this where process.env is polyfilled or provided.

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateAssistantResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, I cannot connect to the AI service right now. Please check the API configuration.";
  }

  // Inject car inventory context
  const carContext = CARS.map(c => 
    `${c.year} ${c.brand} ${c.model} (${c.type}) - $${c.pricePerDay}/day. Located in ${c.location}. Features: ${c.features.join(', ')}.`
  ).join('\n');

  const systemInstruction = `
    You are 'Genius', a helpful and knowledgeable car rental concierge for RentACar Genius.
    
    Here is our current fleet of cars:
    ${carContext}

    Your goal is to help users find the perfect car for their needs.
    - If they ask for recommendations, suggest specific cars from our list based on their needs (budget, location, style).
    - If they ask about prices, quote the 'pricePerDay' from the list.
    - Be polite, concise, and professional.
    - If a user asks for a car we don't have, apologize and suggest a similar alternative from our list.
    - Do not make up cars that are not in the list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm not sure how to answer that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble thinking right now. Please try again later.";
  }
};
