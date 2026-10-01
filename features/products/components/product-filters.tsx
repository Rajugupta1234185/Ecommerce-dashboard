"use client";

import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounced-input";
import { fieldStyles } from "@/components/ui/field-styles";
import { SEARCH_DEBOUNCE_MS } from "../constants";
import type { ProductFilters as Filters } from "../types/product.type";

type ProductFiltersProps = {
  filters: Filters;
  categories: string[];
  onChange: (patch: Partial<Filters>, mode?: "push" | "replace") => void;
  onReset: () => void;
};

function toPrice(value: string): number | null {
  if (value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function ProductFilters({ filters, categories, onChange, onReset }: ProductFiltersProps) {
  return (
    <section
      aria-label="Filter products"
      className="mb-6 grid gap-3 rounded-xl border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <DebouncedInput
        type="search"
        placeholder="Search by name..."
        aria-label="Search products by name"
        delayMs={SEARCH_DEBOUNCE_MS}
        value={filters.search}
        onValueChange={(search) => onChange({ search })}
        className={`${fieldStyles} lg:col-span-2`}
      />

      <select
        aria-label="Filter by category"
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value }, "push")}
        className={fieldStyles}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <DebouncedInput
        type="number"
        min={0}
        placeholder="Min price"
        aria-label="Minimum price"
        delayMs={SEARCH_DEBOUNCE_MS}
        value={filters.minPrice === null ? "" : String(filters.minPrice)}
        onValueChange={(value) => onChange({ minPrice: toPrice(value) })}
        className={fieldStyles}
      />

      <DebouncedInput
        type="number"
        min={0}
        placeholder="Max price"
        aria-label="Maximum price"
        delayMs={SEARCH_DEBOUNCE_MS}
        value={filters.maxPrice === null ? "" : String(filters.maxPrice)}
        onValueChange={(value) => onChange({ maxPrice: toPrice(value) })}
        className={fieldStyles}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="sm:col-span-2 lg:col-span-5 lg:justify-self-start"
      >
        Clear filters
      </Button>
    </section>
  );
}