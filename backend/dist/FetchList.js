"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genai_1 = require("@google/genai");
const key = process.env.GEMINI_API_KEY;
const ai = new genai_1.GoogleGenAI({ apiKey: key });
async function getSongs(temp, isDay, rain) {
    let prompt = `It's ${isDay ? "day" : "night"} here right now. 
    The temperature here is ${temp} degrees celsius, with ${rain}mm rainfall. 
    List 5 English songs to listen to in this weather.`;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: genai_1.Type.ARRAY,
                items: {
                    type: genai_1.Type.OBJECT,
                    "properties": {
                        "title": {
                            type: genai_1.Type.STRING,
                        },
                        "artist": {
                            type: genai_1.Type.STRING,
                        }
                    },
                    propertyOrdering: ["title", "artist"],
                }
            }
        }
    });
    return response.text;
}
exports.default = getSongs;
