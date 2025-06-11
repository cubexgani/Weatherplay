import { GoogleGenAI, Type } from "@google/genai";



const key = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey: key });

async function getSongs(temp: number, isDay: number, rain: number) {
    
    let prompt = `It's ${isDay ? "day" : "night"} here right now. 
    The temperature here is ${temp} degrees celsius, with ${rain}mm rainfall. 
    List 5 English songs to listen to in this weather.`
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    "properties": {
                        "title": {
                            type: Type.STRING,
                        },
                        "artist": {
                            type: Type.STRING,
                        }
                    },
                    propertyOrdering: ["title", "artist"],
                    
                }
            }
        }
    });
    
    return response.text;
}

export default getSongs;
