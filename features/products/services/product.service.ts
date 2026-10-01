import { httpClient } from "@/lib/api/http-client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Product, SortOrder } from "../types/product.type";

const PRODUCTS_REVALIDATE_SECONDS = 300; 
const CATEGORIES_REVALIDATE_SECONDS = 3600; 


export function getProducts(sort: SortOrder = "asc"): Promise<Product[]> {
  return httpClient<Product[]>(`${ENDPOINTS.products}?sort=${sort}`, {
    next: { revalidate: PRODUCTS_REVALIDATE_SECONDS },
  });
}


export function getProductById(id: string): Promise<Product | null> {
  return httpClient<Product | null>(ENDPOINTS.product(id), {
    next: { revalidate: PRODUCTS_REVALIDATE_SECONDS },
  });
}

/** Category names, used to populate the filter options. */
export function getCategories(): Promise<string[]> {
  return httpClient<string[]>(ENDPOINTS.categories, {
    next: { revalidate: CATEGORIES_REVALIDATE_SECONDS },
  });
}