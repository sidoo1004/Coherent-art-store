/**
 * Shopify Products API
 *
 * Functions for fetching and managing products from Shopify
 */

import { getShopifyClient, handleShopifyError, USE_MOCK_DATA } from './client';
import { shopifyProductToCollection } from './types';
import { mockCollections } from '@/lib/data/mockData';
import { Collection } from '@/types';

/**
 * Fetch all products/collections from Shopify
 */
export async function fetchCollections(): Promise<Collection[]> {
  // Use mock data if Shopify is not configured
  if (USE_MOCK_DATA) {
    console.log('Using mock data (Shopify not configured)');
    return mockCollections;
  }

  try {
    const client = getShopifyClient();
    const products = await client.product.fetchAll();

    return products.map(shopifyProductToCollection);
  } catch (error) {
    console.error('Error fetching collections from Shopify:', error);
    // Fallback to mock data on error
    return mockCollections;
  }
}

/**
 * Fetch a single collection by ID
 */
export async function fetchCollectionById(id: string): Promise<Collection | null> {
  // Use mock data if Shopify is not configured
  if (USE_MOCK_DATA) {
    return mockCollections.find(c => c.id === id) || null;
  }

  try {
    const client = getShopifyClient();
    const product = await client.product.fetch(id);

    if (!product) {
      return null;
    }

    return shopifyProductToCollection(product);
  } catch (error) {
    handleShopifyError(error);
    // Fallback to mock data
    return mockCollections.find(c => c.id === id) || null;
  }
}

/**
 * Search collections by query
 */
export async function searchCollections(query: string): Promise<Collection[]> {
  // Use mock data if Shopify is not configured
  if (USE_MOCK_DATA) {
    const lowerQuery = query.toLowerCase();
    return mockCollections.filter(c =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.theme.toLowerCase().includes(lowerQuery) ||
      c.style.toLowerCase().includes(lowerQuery)
    );
  }

  try {
    const client = getShopifyClient();
    const products = await client.product.fetchQuery({
      query: `title:*${query}* OR tag:*${query}*`
    });

    return products.map(shopifyProductToCollection);
  } catch (error) {
    handleShopifyError(error);
    return [];
  }
}

/**
 * Get featured collections
 */
export async function fetchFeaturedCollections(): Promise<Collection[]> {
  const allCollections = await fetchCollections();
  return allCollections.filter(c => c.featured);
}
