"use client";

import { MAX_ITEM_QUANTITY } from "../constants";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

const stepButton =
  "grid size-9 place-items-center text-lg text-foreground hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_ITEM_QUANTITY,
  label = "Quantity",
}: QuantitySelectorProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-md border bg-surface">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`${stepButton} rounded-l-md`}
      >
        −
      </button>
      <output aria-live="polite" className="min-w-8 text-center text-sm font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={`${stepButton} rounded-r-md`}
      >
        +
      </button>
    </div>
  );
}