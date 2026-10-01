import type { CartState } from "../types/cart.types";

export const selectCartItems = (state: CartState) => state.items;

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);