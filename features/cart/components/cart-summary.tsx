import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format-currency";

type CartSummaryProps = {
  itemCount: number;
  total: number;
  onClear: () => void;
};

export function CartSummary({ itemCount, total, onClear }: CartSummaryProps) {
  return (
    <aside
      aria-label="Order summary"
      className="h-fit rounded-xl border bg-surface p-5 lg:sticky lg:top-24"
    >
      <h2 className="text-lg font-bold">Order summary</h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Items</dt>
          <dd className="tabular-nums">{itemCount}</dd>
        </div>
        <div className="flex justify-between border-t pt-3 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-bold tabular-nums">{formatCurrency(total)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2">
        <Link href="/products" className={buttonStyles({ variant: "outline" })}>
          Continue shopping
        </Link>
        <Button variant="danger-ghost" onClick={onClear}>
          Clear cart
        </Button>
      </div>
    </aside>
  );
}