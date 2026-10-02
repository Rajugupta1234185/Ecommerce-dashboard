import { Suspense } from "react";
import {
  getCategories,
  getProducts,
} from "@/features/products/services/product.service";
import { ProductExplorer } from "@/features/products/components/product-explorer";
import type { SortOrder } from "@/features/products/types/product.type";
import { ErrorBoundary } from "@/components/feedback/error-boundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the full catalog and narrow it down by category, price range, or name.",
  alternates: { canonical: "/products" },
};

type ProductsPageProps = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { sort } = await searchParams;
  const order: SortOrder = sort === "desc" ? "desc" : "asc";

  const [products, categories] = await Promise.all([getProducts(order), getCategories()]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <ErrorBoundary
        title="We couldn't display the products"
        description="Something went wrong while showing the list. Try again."
      >
        <Suspense fallback={null}>
          <ProductExplorer products={products} categories={categories} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}