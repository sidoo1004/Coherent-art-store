# Coherent Art Store - AI-Generated Art E-Commerce Frontend

A high-converting, fully responsive Next.js e-commerce frontend for selling pre-coordinated AI art collections. This application helps homeowners overcome decision paralysis by offering curated art sets designed to work harmoniously across multiple rooms.

## 🎯 Project Overview

### Core Value Proposition
Stop Guessing. Start Decorating with Confidence. Pre-coordinated art collections designed to flow seamlessly through your entire home.

### Key Features

#### 🏠 Homepage
- Compelling hero section with before/after comparison
- Social proof with customer testimonials and statistics
- Featured collection previews with hover effects
- "How It Works" section explaining the 3-step process
- Fully mobile-responsive design

#### 🎨 Collections Gallery
- Advanced filtering system (Theme, Style, Room Count, Price Range)
- Real-time filter updates with active filter badges
- Beautiful grid layout with collection cards
- Smooth animations and transitions

#### 🖼️ Collection Detail Pages
- High-quality image galleries with thumbnails
- Interactive room mockups showing pieces in context
- Pricing tier selector (Budget, Premium, Luxury)
- "What's Included" section with piece details
- Trust badges and style consistency messaging
- Add to cart functionality with tier selection

#### 📝 Style Quiz
- 7-question interactive quiz for personalized recommendations
- Multiple question types (single, multiple, color picker)
- Progress bar and smooth transitions
- Results page with top 3 matched collections
- Match percentage and reasoning for each recommendation

#### 🛒 Cart & Checkout
- Collection integrity messaging
- Quantity adjustments and tier display
- Promo code input
- Single-page checkout flow with React Hook Form validation
- Secure payment information collection
- Order summary with free shipping
- Success page with next steps

#### ℹ️ About Page
- Company story and mission
- "Why Collections Matter" with benefits
- Detailed process explanation
- Quality commitment section

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (for cart)
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Fonts:** Google Fonts (Inter & Playfair Display)
- **Image Optimization:** Next.js Image component

## 📦 Project Structure

```
coherent-art-store/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   ├── cart/                     # Shopping cart
│   ├── checkout/                 # Checkout flow
│   │   └── success/              # Order success page
│   ├── collections/              # Collections gallery
│   │   └── [id]/                 # Collection detail pages
│   ├── quiz/                     # Style quiz
│   │   └── results/              # Quiz results
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── CollectionPreview.tsx
│   │   └── HowItWorks.tsx
│   ├── ui/                       # Reusable UI components
│   │   ├── CollectionCard.tsx
│   │   ├── RoomMockup.tsx
│   │   ├── PriceTierSelector.tsx
│   │   ├── TrustBadge.tsx
│   │   └── TestimonialCard.tsx
│   ├── collections/              # Collection-specific components
│   ├── quiz/                     # Quiz components
│   └── cart/                     # Cart components
├── lib/
│   ├── data/
│   │   └── mockData.ts           # Mock collections and testimonials
│   ├── store/
│   │   └── cartStore.ts          # Zustand cart store
│   └── utils/                    # Utility functions
├── types/
│   └── index.ts                  # TypeScript type definitions
├── public/
│   └── images/                   # Static images
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Coherent-art-store
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette

- **Primary:** `#2d2d2d` (Sophisticated charcoal)
- **Accent:** `#c17a6f` (Warm terracotta)
- **Background:** `#fafaf8` (Off-white)
- **Success:** `#7c9885` (Muted green)
- **Error:** `#c47a7a` (Muted red)

### Typography

- **Headings:** Playfair Display (Serif)
- **Body:** Inter (Sans-serif)

### Components

All components follow a consistent design language with:
- Generous whitespace
- Subtle shadows and hover effects
- Smooth transitions and animations
- Mobile-first responsive design

## 📱 Mobile Responsiveness

The entire application is built mobile-first with:
- Touch-friendly tap targets (44x44px minimum)
- Simplified mobile navigation with hamburger menu
- Swipeable image galleries
- Optimized images for different screen sizes
- Responsive grid layouts

## 🔄 State Management

### Cart Store (Zustand)

The cart uses Zustand with persistence for:
- Adding/removing items
- Updating quantities
- Calculating totals
- Persisting cart state across sessions

```typescript
const { items, addItem, removeItem, updateQuantity, getTotal } = useCartStore();
```

## 📊 Mock Data

The application includes comprehensive mock data for:
- 4 featured art collections with multiple pieces each
- Customer testimonials with ratings
- Room mockup configurations
- Pricing tiers (Budget, Premium, Luxury)

**Note:** In production, this should be replaced with real API calls to a backend service.

## 🔐 Backend Integration Points

The following areas need backend integration:

1. **Collections API** - Fetch real collection data
2. **Quiz Results** - Store and retrieve personalized recommendations
3. **Cart Persistence** - Store cart data per user
4. **Checkout** - Payment processing (Stripe, PayPal, etc.)
5. **Order Management** - Order tracking and fulfillment
6. **Email Service** - Confirmation emails, marketing
7. **User Authentication** - Account creation and management
8. **Analytics** - Track user behavior and conversions

## 🎯 Conversion Optimization Features

- **Exit Intent Popup** - Capture abandoning visitors (commented in code)
- **Style Quiz** - Lead generation and personalization
- **Room Mockups** - Reduce purchase uncertainty
- **Trust Badges** - Build credibility throughout the funnel
- **Collection Integrity Messaging** - Reinforce value proposition
- **Pricing Tiers** - Cater to different budget levels
- **Free Shipping** - Remove friction
- **30-60 Day Returns** - Reduce risk

## 📈 Performance

The application is optimized for performance:
- Next.js Image component with lazy loading
- Code splitting with App Router
- Optimized bundle size
- Static generation where possible
- Framer Motion for smooth animations

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## 🔮 Future Enhancements

### Phase 2 (Post-Launch)
- User accounts with saved favorites
- Advanced search functionality
- AR "View in Your Room" feature
- Live chat integration
- Exit intent popup implementation
- A/B testing framework

### Phase 3 (Optimization)
- Collection builder (custom combinations)
- Referral program
- Subscription model (seasonal updates)
- Social sharing features
- Wishlist functionality
- Reviews and ratings

## 🐛 Known Issues

- Font optimization warnings during build (due to network restrictions in build environment)
- Server-side rendering warnings for checkout page (expected behavior with client-side cart state)

## 📝 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a private project. Please contact the project maintainers for contribution guidelines.

## 📞 Support

For questions or issues, please contact the development team.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
