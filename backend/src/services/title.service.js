import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

class TitleService {
  async generateTitle(firstMessage) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a short chat title (maximum 5 words) for this message:\n\n${firstMessage}`,
    });

    return response.text.replace(/["']/g, "").trim();
  }
}

export default new TitleService();