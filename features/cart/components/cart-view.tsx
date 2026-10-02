"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { EmptyState } from "@/components/feedback/empty-state";
import { useCartHydrated } from "../hooks/use-cart-hydrated";
import { selectCartCount, selectCartItems } from "../store/cart.selector";
import { useCartStore } from "../store/cart.store";
import { calculateTotal } from "../utils/calculate-total";
import { CartItemRow } from "./cart-item-row";
import { CartSkeleton } from "./cart-skeleton";
import { CartSummary } from "./cart-summary";

export function CartView() {
  const router = useRouter();
  const hydrated = useCartHydrated();

  const items = useCartStore(selectCartItems);
  const itemCount = useCartStore(selectCartCount);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const total = useMemo(() => calculateTotal(items), [items]);


  if (!hydrated) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Browse the catalog and add something you like."
        actionLabel="Browse products"
        onAction={() => router.push("/products")}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-y rounded-xl border bg-surface p-5">
        {items.map((item) => (
          <CartItemRow
            key={item.productId}
            item={item}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>

      <CartSummary itemCount={itemCount} total={total} onClear={clear} />
    </div>
  );
}