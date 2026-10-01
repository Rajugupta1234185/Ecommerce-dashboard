import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Product not found</h1>
      <p className="mt-2 text-muted-foreground">
        The product you are looking for does&apos;t exist or was removed.
      </p>
      <Link href="/products" className={buttonStyles({ className: "mt-6" })}>
        Back to products
      </Link>
    </main>
  );
}