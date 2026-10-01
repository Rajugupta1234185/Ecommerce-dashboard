import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CART_STORAGE_KEY, MAX_ITEM_QUANTITY } from "../constants";
import type { CartState } from "../types/cart.types";

/** Keep quantity a whole number between 1 and the max. */
function clampQuantity(quantity: number): number {
  return Math.min(Math.max(1, Math.floor(quantity)), MAX_ITEM_QUANTITY);
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);

          // Already in the cart: increase the quantity instead of adding a duplicate line
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: clampQuantity(quantity),
              },
            ],
          };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: clampQuantity(quantity) }
              : item,
          ),
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1, 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), 
      skipHydration: true, 
    },
  ),
);