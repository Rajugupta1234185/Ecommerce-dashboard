import type { CartItem } from "../types/cart.types";

export function calculateTotal(items: CartItem[]): number {
  const cents = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0,
  );
  return cents / 100;
}