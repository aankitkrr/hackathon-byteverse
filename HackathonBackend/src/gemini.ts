import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./config";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});

interface roadmapInterface {
    goal: string;
    level: string;
    skills: any[];
    availableTime: string;
    duration: string;
  }
  

export async function generateFromGemini({ goal, level, skills, availableTime, duration } : roadmapInterface ) {

  const skillsArray = Array.isArray(skills) ? skills : [skills];

  const userPrompt = `You are a career roadmap planner. Return VALID JSON ONLY.

  Create a learning roadmap for someone wanting to become a "${goal}".
  The user is at "${level}" level, knows [${skillsArray.join(", ") || "nothing"}], 
  has ${availableTime} hours/week, and ${duration} months total.
  
  Respond in this EXACT format (array of objects):
  [
      {
          "title": "Phase title",
          "duration": weeks (number),
          "tip": "Practical advice"
      }
  ]
  NO EXTRA TEXT OR EXPLANATION. ONLY VALID JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
    });

    return response.text;
  }
  catch (error) {
    throw error;
  }
}