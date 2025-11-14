import { GoogleGenAI, Type } from "@google/genai";
import { ImamRecommendation, UserInputs } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. The app will not be able to generate recommendations.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        status: { type: Type.STRING, description: "Constant value: 'success'" },
        ui_instructions: {
            type: Type.OBJECT,
            properties: {
                brand_theme: { type: Type.STRING },
                layout: { type: Type.STRING },
                show_reset_button: { type: Type.BOOLEAN },
                reset_button_label: { type: Type.STRING },
                reset_button_position: { type: Type.STRING },
                image_scaling: { type: Type.STRING },
                max_width: { type: Type.STRING },
                optimize_for: { type: Type.ARRAY, items: { type: Type.STRING } },
                logo_style: { type: Type.STRING },
            },
            required: ["brand_theme", "layout", "show_reset_button", "reset_button_label", "reset_button_position", "image_scaling", "max_width", "optimize_for", "logo_style"],
        },
        analysis: {
            type: Type.OBJECT,
            properties: {
                skin_tone_detected: { type: Type.STRING },
                face_shape: { type: Type.STRING },
                body_observation: { type: Type.STRING },
                notes: { type: Type.STRING },
            },
            required: ["skin_tone_detected", "face_shape", "body_observation", "notes"],
        },
        main_outfit: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                top: { type: Type.STRING },
                bottom: { type: Type.STRING },
                layer: { type: Type.STRING },
                footwear: { type: Type.STRING },
                accessories: { type: Type.ARRAY, items: { type: Type.STRING } },
                hairstyle: { type: Type.STRING },
                grooming: { type: Type.STRING },
                perfume: { type: Type.STRING },
                why_this_look_works: { type: Type.STRING },
            },
            required: ["title", "description", "top", "bottom", "footwear", "accessories", "hairstyle", "grooming", "perfume", "why_this_look_works"],
        },
        festival_details: {
            type: Type.OBJECT,
            properties: {
                enabled: { type: Type.BOOLEAN },
                details: { type: Type.STRING },
            },
            required: ["enabled", "details"],
        },
        image_generation: {
            type: Type.OBJECT,
            properties: {
                use_imagen: { type: Type.BOOLEAN },
                prompt: { type: Type.STRING },
                no_model: { type: Type.BOOLEAN },
                no_watermark: { type: Type.BOOLEAN },
            },
            required: ["use_imagen", "prompt", "no_model", "no_watermark"],
        },
        alternatives: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    style: { type: Type.STRING, enum: ["budget", "premium", "minimal"] },
                    outfit: { type: Type.STRING },
                },
                required: ["style", "outfit"],
            },
        },
    },
    required: ["status", "ui_instructions", "analysis", "main_outfit", "festival_details", "image_generation", "alternatives"],
};


export const generateStyleRecommendation = async (
    inputs: UserInputs, 
    imageBase64?: string,
    imageMimeType?: string
): Promise<ImamRecommendation> => {

    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    
    const systemInstruction = `You are the exclusive fashion intelligence engine for IMAM — The Premium Indian AI Stylist.
Your job is to generate: Human-like outfit recommendations, Correct gender clothing (MANDATORY), Premium accessories, hairstyles, and grooming, Festival-accurate styling, Responsive UI instructions, High-quality Imagen outfit images, Proper image scaling (mobile + laptop), a “Start Again” reset button.
You must not browse, use external websites, add watermarks, mention of AI models, or mismatch clothing (never female clothes on male, never male clothes on female).

🔥 INPUTS YOU WILL RECEIVE
- gender
- age
- body_type
- skin_tone
- event
- preferences
- uploaded_photo (optional)

🔥 YOU MUST OUTPUT IN EXACT JSON STRUCTURE BELOW
{
  "status": "success",
  "ui_instructions": {
    "brand_theme": "IMAM - premium black & gold",
    "layout": "clean, modern, minimal",
    "show_reset_button": true,
    "reset_button_label": "Start Again",
    "reset_button_position": "top-right",
    "image_scaling": "responsive",
    "max_width": "300px",
    "optimize_for": ["mobile", "tablet", "laptop"],
    "logo_style": "IMAM in premium golden engraved typography"
  },
  "analysis": {
    "skin_tone_detected": "...",
    "face_shape": "...",
    "body_observation": "...",
    "notes": "Write analysis in short, stylist-like human tone."
  },
  "main_outfit": {
    "title": "Your Premium Suggested Look",
    "description": "Human-like outfit explanation with real stylist tone and simple Indian English. No robotic tone.",
    "top": "...",
    "bottom": "...",
    "layer": "...(optional, if not applicable, omit or leave empty)",
    "footwear": "...",
    "accessories": ["...", "..."],
    "hairstyle": "...",
    "grooming": "...",
    "perfume": "...",
    "why_this_look_works": "Explain clearly why these colors, patterns, and fits match the user’s tone, event, and body type."
  },
  "festival_details": {
    "enabled": true/false,
    "details": "Give cultural styling logic: colors, embroidery type, fabrics, patterns, do’s & don’ts for each festival such as Eid, Diwali, Holi, Christmas, Weddings."
  },
  "image_generation": {
    "use_imagen": true,
    "prompt": "Generate a hyper-realistic outfit-only catalog image (no humans). Show the exact top, bottom, footwear, and accessories. Clean premium studio background, luxury golden lighting, IMAM style aesthetic. Very high detail, 8K fashion catalogue quality.",
    "no_model": true,
    "no_watermark": true
  },
  "alternatives": [
    { "style": "budget", "outfit": "..." },
    { "style": "premium", "outfit": "..." },
    { "style": "minimal", "outfit": "..." }
  ]
}

🧠 MANDATORY RULES YOU MUST ALWAYS FOLLOW
✔ 1. Gender Logic: If male, ONLY give men’s clothes. If female, ONLY give women’s clothes. Never mix. Never output saree on men or sherwani on women.
✔ 2. Imagen Image Rules: Use only Imagen. Create outfit-only images (no human wearing it). Premium fashion catalog style. No watermark. No model name.
✔ 3. Responsive Image Scaling: Images must have max-width: 300px, auto height, not stretch, and be centered.
✔ 4. Reset Button: Always include “Start Again” button for the top-right.
✔ 5. Human-like Explanation: Tone must be friendly, stylist-like, very natural, simple English, and absolutely no robotic tone or AI references.
✔ 6. Festival Mode Enhancement: For festivals: Eid → pastel, whites, subtle embroidery, attar. Diwali → gold, maroon, ethnic shine. Weddings → sherwani/lehenga with heavy detailing. Christmas → winter tones, warm layers. Holi → washable clothes, light fabrics. Add cultural meaning.
✔ 7. Accessories: Men: watches, sunglasses, bracelets, cuffs, pocket squares. Women: jhumkas, bangles, clutch, necklace, hair accessories.

⭐ FINAL LINE: Never mismatch outfits with gender. Never mention AI, models, or generation. Produce premium IMAM-level styling, realistic Imagen images, and fully responsive UI instructions.`;

    let promptParts = [];

    if (imageBase64 && imageMimeType) {
        promptParts.push({
            inlineData: {
                data: imageBase64,
                mimeType: imageMimeType
            }
        });
        promptParts.push({ text: "Analyze this user's photo for your recommendation." });
    }

    let textPrompt = `
    User Details:
    - Occasion: ${inputs.occasion}
    - Gender: ${inputs.gender}
    - Age Range: ${inputs.ageRange}
    - Body Type: ${inputs.bodyType}
    - Skin Tone: ${inputs.skinTone}
    - Budget: ${inputs.budget}

    Generate a complete style recommendation based on these details. Follow all rules and output the exact JSON format.
    `;
    promptParts.push({ text: textPrompt });

    try {
        // Step 1: Get the text-based recommendation and image prompt
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using pro for better adherence to complex instructions
            contents: { parts: promptParts },
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.8,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });
        
        const jsonText = response.text.trim();
        const recommendation = JSON.parse(jsonText) as ImamRecommendation;

        // Step 2: If an AI image is required, generate it
        const imageGenConfig = recommendation.image_generation;
        if (imageGenConfig.use_imagen && imageGenConfig.prompt) {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: imageGenConfig.prompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '3:4', // Portrait orientation for outfits
                },
            });

            if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
                const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
                recommendation.main_outfit.generated_image_base64 = base64ImageBytes;
            }
        }
        
        return recommendation;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate style recommendation.");
    }
};