export interface UserInputs {
  occasion: string;
  gender: string;
  ageRange: string;
  bodyType: string;
  skinTone: string;
  budget: string;
}

// New Types for IMAM Recommendation
export interface UiInstructions {
    brand_theme: string;
    layout: string;
    show_reset_button: boolean;
    reset_button_label: string;
    reset_button_position: string;
    image_scaling: string;
    max_width: string;
    optimize_for: string[];
    logo_style: string;
}

export interface Analysis {
    skin_tone_detected: string;
    face_shape: string;
    body_observation: string;
    notes: string;
}

export interface MainOutfit {
    title: string;
    description: string;
    top: string;
    bottom: string;
    layer?: string;
    footwear: string;
    accessories: string[];
    hairstyle: string;
    grooming: string;
    perfume: string;
    why_this_look_works: string;
    generated_image_base64?: string; // To hold the generated image
}

export interface FestivalDetails {
    enabled: boolean;
    details: string;
}

export interface ImageGeneration {
    use_imagen: boolean;
    prompt: string;
    no_model: boolean;
    no_watermark: boolean;
}

export interface Alternative {
    style: "budget" | "premium" | "minimal";
    outfit: string;
}

export interface ImamRecommendation {
    status: "success";
    ui_instructions: UiInstructions;
    analysis: Analysis;
    main_outfit: MainOutfit;
    festival_details: FestivalDetails;
    image_generation: ImageGeneration;
    alternatives: Alternative[];
}


// FIX: Stubs for unused components to resolve import errors.
export interface RecommendedItem {
  item_name: string;
  image_path: string;
}

export interface OutfitOption {
  title: string;
  explanation: string;
  items: RecommendedItem[];
}
