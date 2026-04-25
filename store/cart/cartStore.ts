// store/cart/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CartItem, ShopGroup } from '../../types/cart/cart';
import type { CurrencyAmount } from '../../types/product/product';

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => CurrencyAmount;
  getGroupedByShop: () => ShopGroup[];
}

// Persistent storage configuration
const storage = createJSONStorage(() => AsyncStorage);

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => {
        const cartItemId = `${newItem.productId}-${newItem.variantId}`;
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.cartItemId === cartItemId
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...newItem, cartItemId }] };
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalAmount: () =>
        get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),

      getGroupedByShop: () => {
        const grouped: Record<string, ShopGroup> = {};
        get().items.forEach((item) => {
          if (!grouped[item.shopId]) {
            grouped[item.shopId] = {
              shopId: item.shopId,
              shopName: item.shopName,
              items: [],
            };
          }
          grouped[item.shopId].items.push(item);
        });
        return Object.values(grouped);
      },
    }),

    {
      name: 'bharat-linker-cart',           // storage key
      storage: storage,                     // AsyncStorage
      partialize: (state) => ({ items: state.items }), // only save items
    }
  )
);