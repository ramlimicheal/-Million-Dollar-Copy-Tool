
import { GoogleGenAI } from "@google/genai";
import { MASTER_PROMPT } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeWebsite = async (targetUrl: string): Promise<string> => {
  try {
    const prompt = MASTER_PROMPT.replace('{TARGET_URL}', targetUrl);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // More detailed error message for debugging
        return `Error interacting with Gemini API: ${error.message}. Check browser console for more details. This could be due to network issues, an invalid API key, or content safety policies.`;
    }
    return "An unknown error occurred while calling the Gemini API.";
  }
};
