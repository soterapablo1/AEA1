
import { GoogleGenAI, Type } from "@google/genai";

export async function analyzeNewsPriority(content: string): Promise<'low' | 'medium' | 'high' | 'critical'> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza el siguiente reporte de novedad de un observatorio astronómico y clasifica su prioridad (low, medium, high, critical) basándote en la gravedad del incidente (ej. daño instrumental es critical, limpieza es low, evento celestial importante es medium/high). Reporte: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priority: {
              type: Type.STRING,
              description: "The priority level: low, medium, high, critical",
            },
          },
          required: ["priority"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return result.priority || 'medium';
  } catch (error) {
    console.error("Error analyzing priority:", error);
    return 'medium';
  }
}

export async function getSkyData() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Proporciona datos astronómicos actuales para Oro Verde, Entre Ríos, Argentina (Lat -31.7416, Lng -60.5113). Incluye: puesta de sol, salida de sol, fase lunar (nombre y %), planetas visibles a simple vista esta noche, y 3 objetos de cielo profundo recomendados (nombre y tipo). Responde solo en JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sunset: { type: Type.STRING },
            sunrise: { type: Type.STRING },
            moon: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                illumination: { type: Type.STRING }
              }
            },
            planets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching sky data:", error);
    return null;
  }
}
