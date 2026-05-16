import { GoogleGenAI, GenerateContentResponse, Modality, Type, ThinkingLevel } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

export const getAI = () => {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const chatWithConcierge = async (message: string, history: any[] = []) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3.1-flash-lite-preview",
    config: {
      systemInstruction: "You are the Porsche Exclusive Concierge. You are sophisticated, knowledgeable, and helpful. You represent the Porsche brand, which stands for luxury, performance, and precision. You help users explore Porsche models, configure their dream car, and find Porsche Centers. Use a premium and professional tone.",
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generatePorscheImage = async (prompt: string, aspectRatio: string = "16:9", size: string = "1K") => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `A high-end, professional studio photograph of a Porsche. ${prompt}. Cinematic lighting, 8k resolution, photorealistic.` }],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize: size as any
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generatePorscheVideo = async (imageBytes: string, prompt: string) => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Animate this Porsche. ${prompt}. Cinematic camera movement, high quality.`,
    image: {
      imageBytes,
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  return operation.response?.generatedVideos?.[0]?.video?.uri;
};

export const findPorscheCenters = async (query: string, lat?: number, lng?: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find Porsche Centers near ${query}`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: lat && lng ? {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        } : undefined
      }
    },
  });

  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
  };
};

export const getAdvancedPorscheInsight = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: query,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      systemInstruction: "You are a Porsche engineering expert. Provide deep technical insights about Porsche performance, history, and engineering. Be precise and sophisticated."
    }
  });
  return response.text;
};
