"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "../store/cart.store";


export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => useCartStore.persist.onFinishHydration(onStoreChange),
    () => useCartStore.persist.hasHydrated(),
    () => false, // on the server the cart is never hydrated
  );
}