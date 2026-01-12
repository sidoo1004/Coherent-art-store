/**
 * Shopify Checkout API
 *
 * Functions for managing checkout and cart operations
 */

import { getShopifyClient, USE_MOCK_DATA } from './client';
import { ShopifyLineItem } from './types';

/**
 * Create a new Shopify checkout
 */
export async function createCheckout(): Promise<any> {
  if (USE_MOCK_DATA) {
    // Return mock checkout for development
    return {
      id: 'mock-checkout-id',
      webUrl: '/checkout',
      lineItems: [],
      subtotalPrice: '0',
    };
  }

  const client = getShopifyClient();
  return await client.checkout.create();
}

/**
 * Add items to checkout
 */
export async function addToCheckout(
  checkoutId: string,
  lineItems: ShopifyLineItem[]
): Promise<any> {
  if (USE_MOCK_DATA) {
    // Mock response for development
    return {
      id: checkoutId,
      webUrl: '/checkout',
      lineItems: lineItems,
    };
  }

  const client = getShopifyClient();
  return await client.checkout.addLineItems(checkoutId, lineItems);
}

/**
 * Update line item quantity
 */
export async function updateCheckoutLineItem(
  checkoutId: string,
  lineItemId: string,
  quantity: number
): Promise<any> {
  if (USE_MOCK_DATA) {
    return { id: checkoutId };
  }

  const client = getShopifyClient();
  return await client.checkout.updateLineItems(checkoutId, [
    { id: lineItemId, quantity }
  ]);
}

/**
 * Remove line item from checkout
 */
export async function removeFromCheckout(
  checkoutId: string,
  lineItemId: string
): Promise<any> {
  if (USE_MOCK_DATA) {
    return { id: checkoutId };
  }

  const client = getShopifyClient();
  return await client.checkout.removeLineItems(checkoutId, [lineItemId]);
}

/**
 * Get checkout URL for redirect
 */
export function getCheckoutUrl(checkout: any): string {
  if (USE_MOCK_DATA) {
    return '/checkout';
  }

  return checkout.webUrl;
}

/**
 * Fetch existing checkout by ID
 */
export async function fetchCheckout(checkoutId: string): Promise<any> {
  if (USE_MOCK_DATA) {
    return { id: checkoutId };
  }

  const client = getShopifyClient();
  return await client.checkout.fetch(checkoutId);
}
