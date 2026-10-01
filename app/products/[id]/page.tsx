import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/api-error";
import { getProductById } from "@/features/products/services/product.service";
import { ProductDetail } from "@/features/products/components/product-detail";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { ProductJsonLd } from "@/features/products/components/product-json-ld";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};


const getProduct = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) notFound();

  try {
    const product = await getProductById(id);
    if (!product) notFound();
    return product;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error; // anything else goes to the nearest error.tsx
  }
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  const description = product.description.slice(0, 160);

  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: product.title,
      description,
      images: [{ url: product.image, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  const isAuthenticated = (await cookies()).has(AUTH_COOKIE);

  return (
  <>
    <ProductJsonLd product={product} />
    <ProductDetail product={product} isAuthenticated={isAuthenticated} />
  </>
 ) ;
}