/**
 * Shopify Type Definitions
 *
 * These types map our application types to Shopify's data structures
 */

import { Collection, ArtPiece, PriceTier } from '@/types';

/**
 * Shopify Product with custom metafields for art collections
 */
export interface ShopifyProduct {
  id: any;
  title: string;
  description: string;
  images: any[];
  variants: any[];
  tags?: string[];
  // Custom metafields we'll add in Shopify
  metafields?: {
    theme?: string;
    style?: string;
    roomCount?: number;
    colorPalette?: string; // JSON string of color array
    pieces?: string; // JSON string of art pieces
  };
}

/**
 * Shopify Checkout
 */
export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  lineItems: any[];
  subtotalPrice: string;
}

/**
 * Convert Shopify Product to our Collection type
 */
export function shopifyProductToCollection(product: any): Collection {
  const metafields = product.metafields || {};

  // Parse metafields
  const colorPalette = metafields.colorPalette
    ? JSON.parse(metafields.colorPalette)
    : ['#e8dcc4', '#c9b8a0', '#8b7355'];

  const pieces = metafields.pieces
    ? JSON.parse(metafields.pieces)
    : [];

  // Get price from variants
  const price = parseFloat(product.variants[0]?.price?.amount || product.variants[0]?.price || '0');

  return {
    id: product.id.toString(),
    name: product.title,
    theme: metafields.theme || 'Art',
    style: (metafields.style as any) || 'Abstract Minimalism',
    roomCount: metafields.roomCount || pieces.length || 3,
    description: product.description || '',
    colorPalette,
    pieces,
    price: {
      budget: {
        price: Math.round(price * 0.75),
        features: [
          'Standard quality prints',
          'Basic framing options',
          'Free shipping over $100',
          '14-day returns'
        ]
      },
      premium: {
        price: price,
        features: [
          'Enhanced quality prints',
          'Premium framing options',
          'Free shipping',
          '30-day returns',
          'Professional hanging guide'
        ]
      },
      luxury: {
        price: Math.round(price * 1.5),
        features: [
          'Museum-quality prints',
          'Custom framing',
          'White-glove delivery',
          '60-day returns',
          'Professional hanging guide',
          'Virtual design consultation'
        ]
      }
    },
    images: {
      main: product.images[0]?.src || '',
      gallery: product.images.map((img: any) => img.src) || []
    },
    featured: product.tags?.includes('featured') || false
  };
}

/**
 * Line item for adding to Shopify checkout
 */
export interface ShopifyLineItem {
  variantId: string;
  quantity: number;
  customAttributes?: Array<{
    key: string;
    value: string;
  }>;
}
