import { UserInputs, ImamRecommendation } from '../types';
import { generateStyleRecommendation } from './geminiService';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // result is "data:image/jpeg;base64,...."
            // we want to remove the prefix
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        }
        reader.onerror = (error) => reject(error);
    });
}

export const getRecommendation = async (inputs: UserInputs, imageFile: File | null): Promise<ImamRecommendation> => {
    console.log("Getting recommendation for:", inputs);
    
    let imageBase64: string | undefined;
    let imageMimeType: string | undefined;

    if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
        imageMimeType = imageFile.type;
    }

    try {
        const response = await generateStyleRecommendation(inputs, imageBase64, imageMimeType);
        return response;
    } catch (error) {
        console.error("Failed to get recommendation from Gemini Service:", error);
        // In a real app, you might want a more user-friendly error state
        throw new Error("Our AI stylist is busy right now. Please try again shortly.");
    }
};