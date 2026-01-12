import { Collection, Testimonial } from "@/types";

export const mockCollections: Collection[] = [
  {
    id: "seasons-abstract-minimalism",
    name: "Seasons Flow",
    theme: "Seasons",
    style: "Abstract Minimalism",
    roomCount: 5,
    description: "Experience the subtle transitions of nature's seasons through minimalist abstract art. This collection brings a sense of calm progression throughout your home, with muted tones that complement any modern interior.",
    colorPalette: ["#e8dcc4", "#c9b8a0", "#8b7355", "#5d4e37", "#3a3226"],
    price: {
      budget: {
        price: 129,
        features: [
          "Standard quality prints",
          "Basic framing options",
          "Free shipping over $100",
          "14-day returns"
        ]
      },
      premium: {
        price: 189,
        features: [
          "Enhanced quality prints",
          "Premium framing options",
          "Free shipping",
          "30-day returns",
          "Professional hanging guide"
        ]
      },
      luxury: {
        price: 299,
        features: [
          "Museum-quality prints",
          "Custom framing",
          "White-glove delivery",
          "60-day returns",
          "Professional hanging guide",
          "Virtual design consultation"
        ]
      }
    },
    images: {
      main: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
        "https://images.unsplash.com/photo-1582201957195-65f5e6d9f96a?w=800"
      ]
    },
    pieces: [
      {
        id: "seasons-1",
        name: "Spring Morning - Living Room Centerpiece",
        dimensions: { width: 36, height: 48, unit: "inches" },
        recommendedPlacement: "Above sofa or main seating area",
        room: "Living Room",
        thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
        fullImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800"
      },
      {
        id: "seasons-2",
        name: "Summer Warmth - Dining Area",
        dimensions: { width: 24, height: 36, unit: "inches" },
        recommendedPlacement: "Dining room wall or buffet area",
        room: "Dining Room",
        thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
        fullImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800"
      },
      {
        id: "seasons-3",
        name: "Autumn Transition - Bedroom Sanctuary",
        dimensions: { width: 30, height: 40, unit: "inches" },
        recommendedPlacement: "Above bed headboard",
        room: "Bedroom",
        thumbnail: "https://images.unsplash.com/photo-1582201957195-65f5e6d9f96a?w=400",
        fullImage: "https://images.unsplash.com/photo-1582201957195-65f5e6d9f96a?w=800"
      },
      {
        id: "seasons-4",
        name: "Winter Stillness - Home Office",
        dimensions: { width: 20, height: 30, unit: "inches" },
        recommendedPlacement: "Behind desk or on side wall",
        room: "Office",
        thumbnail: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=400",
        fullImage: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800"
      },
      {
        id: "seasons-5",
        name: "Seasonal Harmony - Entryway Welcome",
        dimensions: { width: 18, height: 24, unit: "inches" },
        recommendedPlacement: "Entryway or hallway",
        room: "Entryway",
        thumbnail: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400",
        fullImage: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800"
      }
    ],
    featured: true
  },
  {
    id: "water-journey-impressionist",
    name: "Water Journey",
    theme: "Water",
    style: "Impressionist Realism",
    roomCount: 5,
    description: "Follow water's journey from mountain streams to ocean depths. This impressionist collection captures the fluid movement and serene beauty of water in all its forms, creating a cohesive flow throughout your living spaces.",
    colorPalette: ["#7a9eb8", "#5d8aa8", "#4a7ba7", "#2c5f8d", "#1e4d73"],
    price: {
      budget: {
        price: 139,
        features: [
          "Standard quality prints",
          "Basic framing options",
          "Free shipping over $100",
          "14-day returns"
        ]
      },
      premium: {
        price: 199,
        features: [
          "Enhanced quality prints",
          "Premium framing options",
          "Free shipping",
          "30-day returns",
          "Professional hanging guide"
        ]
      },
      luxury: {
        price: 319,
        features: [
          "Museum-quality prints",
          "Custom framing",
          "White-glove delivery",
          "60-day returns",
          "Professional hanging guide",
          "Virtual design consultation"
        ]
      }
    },
    images: {
      main: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
      ]
    },
    pieces: [
      {
        id: "water-1",
        name: "Mountain Stream - Living Room",
        dimensions: { width: 40, height: 50, unit: "inches" },
        recommendedPlacement: "Main living room wall",
        room: "Living Room",
        thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
        fullImage: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"
      },
      {
        id: "water-2",
        name: "River Flow - Hallway",
        dimensions: { width: 24, height: 32, unit: "inches" },
        recommendedPlacement: "Hallway or corridor",
        room: "Hallway",
        thumbnail: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400",
        fullImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800"
      },
      {
        id: "water-3",
        name: "Ocean Depths - Bedroom",
        dimensions: { width: 36, height: 48, unit: "inches" },
        recommendedPlacement: "Above bed",
        room: "Bedroom",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
        fullImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
      },
      {
        id: "water-4",
        name: "Coastal Mist - Bathroom",
        dimensions: { width: 20, height: 30, unit: "inches" },
        recommendedPlacement: "Bathroom wall",
        room: "Bathroom",
        thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400",
        fullImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800"
      },
      {
        id: "water-5",
        name: "Rain Reflections - Kitchen",
        dimensions: { width: 18, height: 24, unit: "inches" },
        recommendedPlacement: "Kitchen or breakfast nook",
        room: "Kitchen",
        thumbnail: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=400",
        fullImage: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800"
      }
    ],
    featured: true
  },
  {
    id: "bold-contemporary-urban",
    name: "Urban Energy",
    theme: "Urban Life",
    style: "Bold Contemporary",
    roomCount: 3,
    description: "Capture the vibrant energy of city life with bold, contemporary designs. This collection brings dynamic color and modern sophistication to your urban dwelling, perfect for those who love the pulse of metropolitan living.",
    colorPalette: ["#ff6b6b", "#f9ca24", "#6c5ce7", "#00b894", "#2d3436"],
    price: {
      budget: {
        price: 99,
        features: [
          "Standard quality prints",
          "Basic framing options",
          "Free shipping over $100",
          "14-day returns"
        ]
      },
      premium: {
        price: 159,
        features: [
          "Enhanced quality prints",
          "Premium framing options",
          "Free shipping",
          "30-day returns",
          "Professional hanging guide"
        ]
      },
      luxury: {
        price: 259,
        features: [
          "Museum-quality prints",
          "Custom framing",
          "White-glove delivery",
          "60-day returns",
          "Professional hanging guide",
          "Virtual design consultation"
        ]
      }
    },
    images: {
      main: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
        "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800"
      ]
    },
    pieces: [
      {
        id: "urban-1",
        name: "City Pulse - Living Room Statement",
        dimensions: { width: 48, height: 60, unit: "inches" },
        recommendedPlacement: "Main feature wall",
        room: "Living Room",
        thumbnail: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=400",
        fullImage: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800"
      },
      {
        id: "urban-2",
        name: "Neon Nights - Bedroom Energy",
        dimensions: { width: 32, height: 40, unit: "inches" },
        recommendedPlacement: "Bedroom accent wall",
        room: "Bedroom",
        thumbnail: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400",
        fullImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800"
      },
      {
        id: "urban-3",
        name: "Metro Motion - Home Office",
        dimensions: { width: 24, height: 36, unit: "inches" },
        recommendedPlacement: "Behind desk",
        room: "Office",
        thumbnail: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400",
        fullImage: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800"
      }
    ],
    featured: false
  },
  {
    id: "light-shadow-minimalist",
    name: "Light & Shadow",
    theme: "Light & Shadow",
    style: "Abstract Minimalism",
    roomCount: 7,
    description: "Explore the interplay of light and shadow through minimalist compositions. This extensive collection creates a sophisticated dialogue throughout your entire home, emphasizing form and negative space with refined elegance.",
    colorPalette: ["#ffffff", "#e0e0e0", "#9e9e9e", "#616161", "#212121"],
    price: {
      budget: {
        price: 179,
        features: [
          "Standard quality prints",
          "Basic framing options",
          "Free shipping over $100",
          "14-day returns"
        ]
      },
      premium: {
        price: 249,
        features: [
          "Enhanced quality prints",
          "Premium framing options",
          "Free shipping",
          "30-day returns",
          "Professional hanging guide"
        ]
      },
      luxury: {
        price: 399,
        features: [
          "Museum-quality prints",
          "Custom framing",
          "White-glove delivery",
          "60-day returns",
          "Professional hanging guide",
          "Virtual design consultation"
        ]
      }
    },
    images: {
      main: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"
      ]
    },
    pieces: [
      {
        id: "light-1",
        name: "Dawn Break - Living Room",
        dimensions: { width: 40, height: 50, unit: "inches" },
        recommendedPlacement: "Main living area",
        room: "Living Room",
        thumbnail: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=400",
        fullImage: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800"
      },
      {
        id: "light-2",
        name: "Noon Radiance - Dining Room",
        dimensions: { width: 30, height: 40, unit: "inches" },
        recommendedPlacement: "Dining area",
        room: "Dining Room",
        thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
        fullImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800"
      },
      {
        id: "light-3",
        name: "Afternoon Glow - Master Bedroom",
        dimensions: { width: 36, height: 48, unit: "inches" },
        recommendedPlacement: "Above bed",
        room: "Master Bedroom",
        thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
        fullImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"
      },
      {
        id: "light-4",
        name: "Evening Shade - Guest Bedroom",
        dimensions: { width: 24, height: 32, unit: "inches" },
        recommendedPlacement: "Guest room",
        room: "Guest Bedroom",
        thumbnail: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=400",
        fullImage: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800"
      },
      {
        id: "light-5",
        name: "Twilight Whisper - Home Office",
        dimensions: { width: 20, height: 30, unit: "inches" },
        recommendedPlacement: "Office wall",
        room: "Office",
        thumbnail: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400",
        fullImage: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800"
      },
      {
        id: "light-6",
        name: "Night Embrace - Hallway",
        dimensions: { width: 18, height: 24, unit: "inches" },
        recommendedPlacement: "Hallway",
        room: "Hallway",
        thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400",
        fullImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800"
      },
      {
        id: "light-7",
        name: "Midnight Calm - Reading Nook",
        dimensions: { width: 16, height: 20, unit: "inches" },
        recommendedPlacement: "Reading corner",
        room: "Reading Nook",
        thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
        fullImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800"
      }
    ],
    featured: true
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    location: "Portland, OR",
    rating: 5,
    quote: "I spent weeks trying to coordinate art for my new home and was completely overwhelmed. This collection took all the guesswork out - everything works together perfectly!",
    image: "SM"
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Austin, TX",
    rating: 5,
    quote: "As someone with zero design skills, these pre-coordinated collections were a lifesaver. My home finally feels cohesive and intentional.",
    image: "MC"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    location: "Seattle, WA",
    rating: 5,
    quote: "The quality is outstanding and the room mockups gave me complete confidence before purchasing. No more decision paralysis!",
    image: "ER"
  },
  {
    id: "4",
    name: "David Park",
    location: "San Francisco, CA",
    rating: 5,
    quote: "I loved that I could see exactly how each piece would look in different rooms. The collection flows beautifully throughout our entire apartment.",
    image: "DP"
  }
];
