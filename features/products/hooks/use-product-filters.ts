"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { ProductFilters } from "../types/product.type";

type UpdateMode = "push" | "replace";

function parseNumber(value: string | null): number | null {
  if (value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parsePage(value: string | null): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

function writeParam(params: URLSearchParams, key: string, value: string | number | null) {
  const isEmpty = value === null || value === "" || (key === "page" && value === 1);
  if (isEmpty) params.delete(key);
  else params.set(key, String(value));
}

export function useProductFilters() {
  const searchParams = useSearchParams();

  const filters: ProductFilters = useMemo(
    () => ({
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
      minPrice: parseNumber(searchParams.get("minPrice")),
      maxPrice: parseNumber(searchParams.get("maxPrice")),
      page: parsePage(searchParams.get("page")),
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (patch: Partial<ProductFilters>, mode: UpdateMode = "replace") => {
      const params = new URLSearchParams(window.location.search);

      (Object.keys(patch) as (keyof ProductFilters)[]).forEach((key) => {
        writeParam(params, key, patch[key] ?? null);
      });

      if (!("page" in patch)) params.delete("page");

      const query = params.toString();
      const url = query ? `?${query}` : window.location.pathname;

      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [],
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    ["search", "category", "minPrice", "maxPrice", "page"].forEach((key) => params.delete(key));
    const query = params.toString();
    window.history.pushState(null, "", query ? `?${query}` : window.location.pathname);
  }, []);

  return { filters, setFilters, resetFilters };
}