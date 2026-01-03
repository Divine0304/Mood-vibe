
import { GoogleGenAI, Type } from "@google/genai";
import { MoodRecommendation } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const RECOMMENDATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    analyse: {
      type: Type.STRING,
      description: 'Une phrase analytique courte sur l humeur détectée.',
    },
    message_bienveillant: {
      type: Type.STRING,
      description: 'Un texte chaleureux, encourageant et empathique de 2-3 phrases adapté à l humeur de l utilisateur.',
    },
    genre: {
      type: Type.STRING,
      description: 'Le genre musical dominant recommandé.',
    },
    playlist: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          titre: { type: Type.STRING },
          artiste: { type: Type.STRING },
          annee: { type: Type.STRING },
          explication_courte: { type: Type.STRING, description: 'Pourquoi ce titre correspond à l humeur.' },
        },
        required: ['titre', 'artiste', 'annee', 'explication_courte'],
      },
      description: 'Une liste de 5 hits récents (2020-2025) internationaux et francophones.',
    },
  },
  required: ['analyse', 'message_bienveillant', 'genre', 'playlist'],
};

export const getMoodRecommendations = async (moodInput: string): Promise<MoodRecommendation> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tu es un expert musical doublé d'un coach bien-être. Analyse l'humeur suivante : "${moodInput}". 
               1. Rédige d'abord un petit texte très encourageant, empathique et adapté aux émotions de la personne.
               2. Propose ensuite une playlist de 5 hits très connus sortis entre 2020 et 2025 (mix international et francophone).
               Toute ta réponse doit être en FRANÇAIS.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: RECOMMENDATION_SCHEMA,
    },
  });

  if (!response.text) {
    throw new Error('Erreur de réponse de l\'IA');
  }

  return JSON.parse(response.text) as MoodRecommendation;
};
