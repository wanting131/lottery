
import { GoogleGenAI, Type } from "@google/genai";
import { TicketData, AnalysisResult } from "../types";

export const analyzeTicketWithGemini = async (ticket: Partial<TicketData>): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    你是一位精通大數據與易經命理的算命大師。
    現在有一張刮刮樂資訊：
    編號：${ticket.id || '未知'}
    名稱：${ticket.name || '未知'}
    面額：${ticket.price || '未知'}

    請根據這個編號的數字命理（例如：8代表發）、名稱的意向、以及現在的宇宙財運能量，
    給出一個專業的「算命式」預測。
    
    你需要預測：
    1. 中獎機率 (0-100)
    2. 預測中獎金額 (請給出一個具體的金額或區間，例如 "$1,000" 或 "$500 - $2,000")
    3. 今日運勢分數 (0-100)
    4. 大師的投資建議
    5. 充滿神秘色彩的命理讀解（結合編號與名稱）

    請以 JSON 格式回應。
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
            probability: { type: Type.NUMBER, description: "計算出的中獎機率 (0-100)" },
            luckScore: { type: Type.NUMBER, description: "今日運勢分數 (0-100)" },
            predictedAmount: { type: Type.STRING, description: "預測的中獎金額" },
            advice: { type: Type.STRING, description: "大師的投資建議" },
            mysticReading: { type: Type.STRING, description: "充滿神秘色彩的命理讀解" },
          },
          required: ["probability", "luckScore", "predictedAmount", "advice", "mysticReading"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      probability: 25,
      luckScore: 60,
      predictedAmount: "$0 - $500",
      advice: "天機不可洩漏，但今日不宜大舉進攻。",
      mysticReading: "此編號陰陽交替，財氣尚在匯聚之中，需待良辰吉時。"
    };
  }
};
