

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA4EXX3d1UBfxsvYbiJMFxz3DGoiBuIzw0";

export async function generate(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  try {
    const result = await model.generateContentStream(prompt);

    let fullText = "";
    for await (const chunk of result.stream) {
      fullText += chunk.text();
    }

    return fullText;  // return the complete generated text

  } catch (err) {
    console.error("❌ Streaming API error:", err);
    throw err;
  }
}
  






