import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function predictCrop(
  n: number,
  p: number,
  k: number,
  temperature: number,
  humidity: number,
  ph: number,
  rainfall: number,
  state?: string
) {
  const prompt = `
    You are an expert agricultural ML model trained on the Indian Crop Recommendation Dataset.
    Based on the following soil and weather parameters, predict the most suitable crop.
    
    Location: ${state || "India (General)"}
    Parameters:
    - Nitrogen (N): ${n}
    - Phosphorus (P): ${p}
    - Potassium (K): ${k}
    - Temperature: ${temperature}°C
    - Humidity: ${humidity}%
    - pH: ${ph}
    - Rainfall: ${rainfall}mm

    Provide the recommended crop, a confidence score (between 0.85 and 0.99), the typical season for this crop in India (Kharif, Rabi, or Zaid), and a brief explanation of why this crop is suitable for these conditions, specifically considering the regional context of ${state || "the area"}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            crop: { type: Type.STRING, description: "The recommended crop name (e.g., Rice, Wheat, Maize, Cotton)." },
            confidence: { type: Type.NUMBER, description: "Confidence score as a decimal (e.g., 0.94)." },
            season: { type: Type.STRING, description: "Typical growing season in India (Kharif, Rabi, Zaid)." },
            explanation: { type: Type.STRING, description: "Brief explanation of why the crop is suitable." },
          },
          required: ["crop", "confidence", "season", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from model");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error predicting crop:", error);
    throw error;
  }
}

export async function getCropDetails(cropName: string) {
  const prompt = `
    Provide detailed agricultural information for the crop: ${cropName} in the context of Indian agriculture.
    Include:
    - Optimal growing conditions (Soil type, Climate).
    - Common pests and diseases in India.
    - Current approximate market price range in India (INR per quintal).
    - Cultivation best practices for Indian farmers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimalConditions: {
              type: Type.OBJECT,
              properties: {
                soil: { type: Type.STRING },
                climate: { type: Type.STRING },
              },
              required: ["soil", "climate"],
            },
            pestsAndDiseases: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            marketPrice: { type: Type.STRING },
            bestPractices: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["optimalConditions", "pestsAndDiseases", "marketPrice", "bestPractices"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from model");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error getting crop details:", error);
    throw error;
  }
}
