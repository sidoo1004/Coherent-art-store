# Coherent Art Store - AI-Generated Art E-Commerce Frontend

A high-converting, fully responsive Next.js e-commerce frontend for selling pre-coordinated AI art collections. This application helps homeowners overcome decision paralysis by offering curated art sets designed to work harmoniously across multiple rooms.

**🛒 Powered by Shopify** - All payment processing, checkout, and order management handled securely by Shopify. No backend code required!

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

### Frontend
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (for cart)
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Fonts:** Google Fonts (Inter & Playfair Display)
- **Image Optimization:** Next.js Image component

### Backend (Shopify)
- **E-commerce Platform:** Shopify
- **API:** Shopify Storefront API
- **SDK:** shopify-buy
- **Payment Processing:** Shopify Payments (or third-party gateway)
- **Checkout:** Shopify hosted checkout
- **Security:** PCI compliant, SSL included

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
- Shopify store (optional for development)

### Quick Start (Development Mode)

The app works out of the box with mock data, so you can start developing immediately:

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

The app will use mock data until you configure Shopify credentials.

### Production Setup with Shopify

To connect to a real Shopify store:

1. **Set up Shopify store** - Follow the comprehensive guide in [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)

2. **Configure environment variables:**
```bash
cp .env.local.example .env.local
```

3. **Add your Shopify credentials to `.env.local`:**
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_your_token_here
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
NEXT_PUBLIC_USE_MOCK_DATA=false
```

4. **Restart the development server:**
```bash
npm run dev
```

Now the app will fetch products from Shopify and redirect checkout to Shopify's secure checkout page.

📚 **For detailed Shopify setup instructions, see [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)**

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
- Creating Shopify checkouts
- Managing checkout URLs

```typescript
const { items, addItem, removeItem, updateQuantity, getTotal, proceedToCheckout } = useCartStore();

// Proceed to Shopify checkout
const checkoutUrl = await proceedToCheckout();
window.location.href = checkoutUrl; // Redirect to Shopify
```

## 📊 Data Management

### Mock Data Mode (Development)

The application includes comprehensive mock data for development:
- 4 featured art collections with multiple pieces each
- Customer testimonials with ratings
- Room mockup configurations
- Pricing tiers (Budget, Premium, Luxury)

Enable mock data mode with:
```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Production Mode (Shopify)

In production, all data comes from Shopify:
- Products fetched via Shopify Storefront API
- Images served from Shopify CDN
- Pricing and inventory managed in Shopify Admin
- Checkout handled by Shopify's secure checkout

Set to Shopify mode with:
```env
NEXT_PUBLIC_USE_MOCK_DATA=false
```

## 🔐 Shopify Integration

### ✅ Handled by Shopify (No Code Required!)

The following are all managed by Shopify out of the box:

1. ✅ **Payment Processing** - Credit cards, PayPal, Apple Pay, Google Pay
2. ✅ **Secure Checkout** - PCI compliant, SSL included
3. ✅ **Order Management** - Dashboard for tracking orders
4. ✅ **Inventory Management** - Automatic stock tracking
5. ✅ **Customer Management** - Built-in customer database
6. ✅ **Email Notifications** - Order confirmations, shipping updates
7. ✅ **Abandoned Cart Recovery** - Automatic follow-up emails
8. ✅ **Taxes & Shipping** - Automatic calculation
9. ✅ **Fraud Protection** - Built-in fraud analysis

### Frontend Integration Points

The frontend integrates with Shopify through:

1. **Products API** (`lib/shopify/products.ts`)
   - Fetch all collections
   - Fetch single collection by ID
   - Search collections

2. **Checkout API** (`lib/shopify/checkout.ts`)
   - Create checkout
   - Add line items
   - Get checkout URL for redirect

3. **Cart Store** (`lib/store/cartStore.ts`)
   - Manages cart state locally
   - Creates Shopify checkout on "Proceed to Checkout"
   - Redirects to Shopify hosted checkout

### What You Need to Do

1. **Set up Shopify store** - Follow [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)
2. **Create products** - Add your art collections to Shopify
3. **Configure environment variables** - Add Shopify credentials
4. **Deploy** - Push to production with Shopify mode enabled

That's it! No backend code required.

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
