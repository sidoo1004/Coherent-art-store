import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Collection, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (collection: Collection, tier: "budget" | "premium" | "luxury") => void;
  removeItem: (collectionId: string) => void;
  updateQuantity: (collectionId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

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
        set({ items: [] });
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
    }),
    {
      name: 'cart-storage',
    }
  )
);
