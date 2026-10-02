import Image from "next/image";
import Link from "next/link";
import { Rating } from "@/components/ui/rating";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { Product } from "../types/product.type";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { id, title, price, category, image, rating } = product;

  return (
    <article className="group relative flex h-full flex-col rounded-xl has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ring">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted transition-colors group-hover:border-primary/40">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-8 mix-blend-multiply"
        />
        <span className="absolute left-3 top-3 rounded-full bg-surface px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
          {category}
        </span>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          <Link
            href={`/products/${id}`}
            className="outline-none after:absolute after:inset-0 group-hover:text-primary"
          >
            {title}
          </Link>
        </h3>

        <Rating
          rate={rating.rate}
          count={rating.count}
          className="text-xs text-muted-foreground"
        />

        <p className="mt-auto pt-1 text-lg font-bold tabular-nums">{formatCurrency(price)}</p>
      </div>
    </article>
  );
}