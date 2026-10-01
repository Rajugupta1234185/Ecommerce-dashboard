"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types/product.type";
import { useCartStore } from "../store/cart.store";
import { QuantitySelector } from "./quantity-selector";

type AddToCartButtonProps = {
  product: Product;
  isAuthenticated: boolean;
};

export function AddToCartButton({ product, isAuthenticated }: AddToCartButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Hide the "Added" message after a moment
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 3000);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    addItem(product, quantity);
    setAdded(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <Button onClick={handleAdd} className="flex-1 sm:flex-none">
          {isAuthenticated ? "Add to cart" : "Sign in to add to cart"}
        </Button>
      </div>

      <p role="status" className="min-h-5 text-sm text-success">
        {added && (
          <>
            Added to cart.{" "}
            <Link href="/cart" className="font-semibold underline">
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  );
}