import { GoogleGenAI, Type } from "@google/genai";



const key = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey: key });

let dt = new Date(Date.now());
let time = dt.toTimeString().split(' ')[0];

async function getSongs(temp: number, rain: number, lang: string) {
    // console.log(temp, rain, lang);
    let prompt = `The time here is ${time} right now. 
    The temperature here is ${temp} degrees celsius, with ${rain}mm rainfall. 
    List 5 ${lang} songs to listen to in these weather conditions.
    Pay close attention to the time while doing so.`
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

async function getRoast(temp: number, rain: number) {
    let prompt = `The time here is ${time} right now. 
    The temperature here is ${temp} degrees celsius, with ${rain}mm rainfall.
    Generate a roast based on the current weather conditions.`
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                "properties": {
                    "roast": {
                        type: Type.STRING,
                    },
                },
            }
        }
    });
    return response.text;
}

export { getSongs, getRoast };
