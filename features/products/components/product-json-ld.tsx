import { SITE_CURRENCY, absoluteUrl } from "@/lib/config/site";
import type { Product } from "../types/product.type";

type ProductJsonLdProps = {
  product: Product;
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const { id, title, description, image, category, price, rating } = product;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image: [image],
    category,
    sku: String(id),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${id}`),
      priceCurrency: SITE_CURRENCY,
      price: price.toFixed(2),
      availability: "https://schema.org/InStock",
    },

    ...(rating.count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.rate,
        reviewCount: rating.count,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}