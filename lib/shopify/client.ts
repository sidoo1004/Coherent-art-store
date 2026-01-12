/**
 * Shopify Storefront API Client
 *
 * This module provides a configured Shopify client for making API requests.
 * The client uses the Storefront API which is designed for customer-facing applications.
 */

import Client from 'shopify-buy';

// Environment variables for Shopify configuration
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// Flag to use mock data (for development before Shopify is set up)
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Initialize Shopify client
let shopifyClient: any | null = null;

/**
 * Get or create the Shopify client instance
 */
export function getShopifyClient(): any {
  if (!shopifyClient && !USE_MOCK_DATA) {
    if (!domain || !storefrontAccessToken) {
      console.warn(
        'Shopify credentials not found. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local'
      );
      throw new Error('Shopify credentials not configured');
    }

    shopifyClient = Client.buildClient({
      domain,
      storefrontAccessToken,
      apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01',
    });
  }

  return shopifyClient!;
}

/**
 * Helper to handle Shopify API errors
 */
export function handleShopifyError(error: any) {
  console.error('Shopify API Error:', error);

  if (error.message?.includes('not found')) {
    throw new Error('Product not found');
  }

  if (error.message?.includes('unavailable')) {
    throw new Error('Product is currently unavailable');
  }

  throw new Error('Failed to fetch from Shopify. Please try again.');
}
