"use client";

import { useEffect } from "react";
import { CART_STORAGE_KEY } from "../constants";
import { useCartStore } from "../store/cart.store";

//saved cart data
export function CartHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) useCartStore.persist.rehydrate();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return null;
}