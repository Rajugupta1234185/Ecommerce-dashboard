import type { Product, ProductFilters } from "../types/product.type";

type ActiveFilters = Pick<ProductFilters, "search" | "category" | "minPrice" | "maxPrice">;

export function filterProducts(products: Product[], filters: ActiveFilters): Product[] {
  const query = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    if (query && !product.title.toLowerCase().includes(query)) return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice !== null && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
    return true;
  });
}