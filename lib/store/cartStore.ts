import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Collection, CartItem } from '@/types';
import { createCheckout, addToCheckout, getCheckoutUrl } from '@/lib/shopify/checkout';

interface CartStore {
  items: CartItem[];
  checkoutId: string | null;
  checkoutUrl: string | null;
  addItem: (collection: Collection, tier: "budget" | "premium" | "luxury") => void;
  removeItem: (collectionId: string) => void;
  updateQuantity: (collectionId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  proceedToCheckout: () => Promise<string>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutId: null,
      checkoutUrl: null,

      addItem: (collection, tier) => {
        const items = get().items;
        const existingItem = items.find(item => item.collection.id === collection.id);

        if (existingItem) {
          // Update existing item
          set({
            items: items.map(item =>
              item.collection.id === collection.id
                ? { ...item, selectedTier: tier, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item
          set({
            items: [...items, { collection, selectedTier: tier, quantity: 1 }],
          });
        }
      },

      removeItem: (collectionId) => {
        set({
          items: get().items.filter(item => item.collection.id !== collectionId),
        });
      },

      updateQuantity: (collectionId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(collectionId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.collection.id === collectionId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], checkoutId: null, checkoutUrl: null });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.collection.price[item.selectedTier].price;
          return total + (price * item.quantity);
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      /**
       * Proceed to Shopify checkout
       * Creates a Shopify checkout and returns the checkout URL
       */
      proceedToCheckout: async () => {
        const items = get().items;

        if (items.length === 0) {
          throw new Error('Cart is empty');
        }

        try {
          // Create Shopify checkout
          let checkoutId: string = get().checkoutId || '';
          let checkout;

          if (!checkoutId) {
            // Create new checkout
            checkout = await createCheckout();
            checkoutId = checkout.id.toString();
          }

          // Add items to checkout
          // Note: In production, you would map collection IDs to Shopify variant IDs
          const lineItems = items.map(item => ({
            variantId: item.collection.id, // TODO: Replace with actual Shopify variant ID
            quantity: item.quantity,
            customAttributes: [
              { key: 'tier', value: item.selectedTier },
              { key: 'collection_name', value: item.collection.name }
            ]
          }));

          checkout = await addToCheckout(checkoutId, lineItems);
          const checkoutUrl = getCheckoutUrl(checkout);

          set({
            checkoutId: checkoutId,
            checkoutUrl: checkoutUrl
          });

          return checkoutUrl;
        } catch (error) {
          console.error('Error creating checkout:', error);
          throw error;
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
