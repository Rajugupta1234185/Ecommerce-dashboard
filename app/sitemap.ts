import type { MetadataRoute } from "next";
import { getProducts } from "@/features/products/services/product.service";
import { absoluteUrl } from "@/lib/config/site";

export const revalidate = 3600; // rebuild at most once an hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // "/" is left out on purpose: it only redirects to /products
  const staticRoutes: MetadataRoute.Sitemap = [{ url: absoluteUrl("/products") }];

  try {
    const products = await getProducts();
    const productRoutes = products.map((product) => ({
      url: absoluteUrl(`/products/${product.id}`),
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}