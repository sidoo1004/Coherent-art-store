// Collection and Product Types
export interface Collection {
  id: string;
  name: string;
  theme: string;
  style: "Abstract Minimalism" | "Impressionist Realism" | "Bold Contemporary";
  roomCount: number;
  pieces: ArtPiece[];
  description: string;
  colorPalette: string[];
  price: PriceTier;
  images: {
    main: string;
    gallery: string[];
  };
  featured?: boolean;
}

export interface ArtPiece {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
    unit: "inches" | "cm";
  };
  recommendedPlacement: string;
  room: string;
  thumbnail: string;
  fullImage: string;
}

export interface PriceTier {
  budget: {
    price: number;
    features: string[];
  };
  premium: {
    price: number;
    features: string[];
  };
  luxury: {
    price: number;
    features: string[];
  };
}

// Cart Types
export interface CartItem {
  collection: Collection;
  selectedTier: "budget" | "premium" | "luxury";
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Quiz Types
export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

export interface QuizResult {
  collections: Collection[];
  matchPercentage: number;
  reasons: string[];
}

// Filter Types
export interface FilterOptions {
  themes: string[];
  styles: string[];
  roomCounts: number[];
  priceRange: {
    min: number;
    max: number;
  };
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  image?: string;
  beforeAfterImages?: {
    before: string;
    after: string;
  };
}

// Room Mockup Types
export interface RoomMockup {
  id: string;
  room: string;
  image: string;
  dimensions: string;
  pieces: string[]; // IDs of art pieces shown in this mockup
}
