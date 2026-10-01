
"use client";

import { useCartHydrated } from "../hooks/use-cart-hydrated";
import { selectCartCount } from "../store/cart.selector";
import { useCartStore } from "../store/cart.store";

export function CartBadge() {
  const count = useCartStore(selectCartCount);
  const hydrated = useCartHydrated();

  if (!hydrated || count === 0) return null;

  return (
    <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs font-bold leading-5 text-primary-foreground tabular-nums">
      <span aria-hidden="true">{count}</span>
      <span className="sr-only">{count} items in cart</span>
    </span>
  );
}