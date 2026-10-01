import Image from "next/image";
import Link from "next/link";
import { Rating } from "@/components/ui/rating";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { Product } from "../types/product.type";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";

type ProductDetailProps = {
  product: Product;
  isAuthenticated: boolean;
};

export function ProductDetail({ product , isAuthenticated }: ProductDetailProps) {
  const { title, price, description, category, image, rating } = product;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/products"
        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Back to products
      </Link>

      <article className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted">
            <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-10 mix-blend-multiply"
            />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{category}</span>
          <h1 className="text-2xl font-bold">{title}</h1>
          <Rating
            rate={rating.rate}
            count={rating.count}
            className="text-sm text-muted-foreground"
          />
          <p className="text-3xl font-semibold">{formatCurrency(price)}</p>
          <p className="leading-relaxed text-foreground/80">{description}</p>
          <div className="mt-2 border-t pt-6">
            <AddToCartButton product={product} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </article>
    </main>
  );
}