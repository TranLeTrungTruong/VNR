import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_ENDPOINT = import.meta.env.VITE_GEMINI_ENDPOINT;

let genAI: GoogleGenerativeAI | null = null;
let model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null = null;

if (GEMINI_API_KEY) {
  try {
    // SDK GoogleGenerativeAI tự động sử dụng endpoint mặc định
    // Nếu cần endpoint tùy chỉnh, có thể cấu hình qua fetch hoặc proxy
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    
    if (GEMINI_ENDPOINT) {
      console.log("📝 Custom Gemini endpoint configured:", GEMINI_ENDPOINT);
      // Note: SDK không hỗ trợ baseURL trực tiếp, endpoint tùy chỉnh cần proxy hoặc middleware
    }
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
