import { GoogleGenAI } from "@google/genai";
import promptService from "./prompt.service.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

class AIService {
  async generateResponse(messages) {
    try {
      const prompt = promptService.buildConversation(messages);

      const contents = prompt.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: message.content,
          },
        ],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });

      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }
}

export default new AIService();