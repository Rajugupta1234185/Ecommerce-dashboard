"use client";

import { useMemo } from "react";
import { EmptyState } from "@/components/feedback/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { paginate } from "@/lib/utils/paginate";
import { PRODUCTS_PER_PAGE } from "../constants";
import { useProductFilters } from "../hooks/use-product-filters";
import { filterProducts } from "../utils/filter-products";
import type { Product } from "../types/product.type";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductSortSelect } from "./product-sort-select";

type ProductExplorerProps = {
  products: Product[];
  categories: string[];
};

export function ProductExplorer({ products, categories }: ProductExplorerProps) {
  const { filters, setFilters, resetFilters } = useProductFilters();

  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);

  const { items, currentPage, totalPages, totalItems } = useMemo(
    () => paginate(filtered, filters.page, PRODUCTS_PER_PAGE),
    [filtered, filters.page],
  );

  return (
    <>
      <ProductFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {totalItems} {totalItems === 1 ? "product" : "products"}
        </p>
        <ProductSortSelect />
      </div>

      {items.length > 0 ? (
        <ProductGrid products={items} />
      ) : (
        <EmptyState
          title="No products match your filters"
          description="Try a different search or clear the filters."
          actionLabel="Clear filters"
          onAction={resetFilters}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setFilters({ page }, "push")}
      />
    </>
  );
}