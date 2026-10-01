import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/features/products/components/product-grid-skeleton";

export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading products...</span>
      <Skeleton className="mb-8 h-14 w-64" />
      <ProductGridSkeleton />
    </main>
  );
}