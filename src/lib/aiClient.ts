import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

let genAI: GoogleGenerativeAI | null = null;
let model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null = null;

if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  } catch (error) {
    console.error("❌ Failed to initialize Gemini API:", error);
  }
} else {
  console.warn("⚠️ GEMINI_API_KEY is missing. Chat functionality will be disabled.");
}

export async function sendMessageToGemini(prompt: string): Promise<string> {
  if (!model) {
    console.error("❌ Gemini API is not configured. Please check your environment variables.");
    return "Xin lỗi, tính năng chat chưa được cấu hình. Vui lòng kiểm tra cài đặt.";
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "Xin lỗi, không thể kết nối đến Gemini API.";
  }
}
