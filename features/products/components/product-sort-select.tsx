"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { fieldStyles } from "@/components/ui/field-styles";
import type { SortOrder } from "../types/product.type";

export function ProductSortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("sort") as SortOrder) ?? "asc";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", event.target.value);
    params.delete("page"); // a new sort order starts on page 1
    router.push(`/products?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      Sort by
      <select
        value={current}
        onChange={handleChange}
        className={`${fieldStyles} py-1.5 text-foreground`}
      >
        <option value="asc">Oldest first (asc)</option>
        <option value="desc">Newest first (desc)</option>
      </select>
    </label>
  );
}