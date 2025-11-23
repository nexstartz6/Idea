import { GoogleGenAI, Type, Schema } from "@google/genai";
import { IdeaExpansion } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const expansionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy name for the project/idea" },
    tagline: { type: Type.STRING, description: "A short, punchy slogan" },
    description: { type: Type.STRING, description: "A professional executive summary (2-3 sentences)" },
    targetAudience: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3 distinct target audience segments"
    },
    keyFeatures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 4 core features or selling points"
    },
    potentialChallenges: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3 potential obstacles"
    },
    pivotOptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      },
      description: "3 alternative directions this idea could take"
    }
  },
  required: ["title", "tagline", "description", "targetAudience", "keyFeatures", "potentialChallenges", "pivotOptions"]
};

export const expandIdea = async (seed: string): Promise<IdeaExpansion> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Act as a senior product strategist. Analyze the following raw idea and expand it into a fully fleshed-out concept. 
      
      Raw Idea: "${seed}"
      
      Provide a structured analysis including a name, tagline, summary, audience, features, challenges, and pivot options.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: expansionSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as IdeaExpansion;
  } catch (error) {
    console.error("Error expanding idea:", error);
    throw error;
  }
};

export const generateConceptImage = async (expansion: IdeaExpansion): Promise<string> => {
  try {
    // Construct a vivid prompt based on the expansion
    const imagePrompt = `A futuristic, high-quality, professional concept art visualization for a project named "${expansion.title}". 
    Context: ${expansion.description}. 
    Style: Minimalist, modern, tech-forward, cinematic lighting, 8k resolution.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: imagePrompt,
      config: {
        // No responseMimeType for image generation models in this context usually, 
        // but we just want the inline data.
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    // Return a placeholder if generation fails to keep UI intact
    return `https://picsum.photos/800/600?grayscale&blur=2`; 
  }
};
