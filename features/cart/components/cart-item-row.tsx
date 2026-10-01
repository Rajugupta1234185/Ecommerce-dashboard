"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { CartItem } from "../types/cart.types";
import { calculateTotal } from "../utils/calculate-total";
import { QuantitySelector } from "./quantity-selector";

type CartItemRowProps = {
  item: CartItem;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
};

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const href = `/products/${item.productId}`;

  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <Link
        href={href}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg border bg-muted sm:size-24"
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="96px"
          className="object-contain p-2 mix-blend-multiply"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={href} className="line-clamp-2 text-sm font-semibold hover:text-primary">
              {item.title}
            </Link>
            <p className="mt-0.5 text-sm text-muted-foreground tabular-nums">
              {formatCurrency(item.price)} each
            </p>
          </div>
          <p className="text-sm font-bold tabular-nums">
            {formatCurrency(calculateTotal([item]))}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <QuantitySelector
            value={item.quantity}
            onChange={(quantity) => onQuantityChange(item.productId, quantity)}
            label={`Quantity for ${item.title}`}
          />
          <Button variant="danger-ghost" size="sm" onClick={() => onRemove(item.productId)}>
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}