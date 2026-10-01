import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">404: Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you are looking for does&apos;t exist.</p>
      <Link href="/products" className={buttonStyles({ className: "mt-6" })}>
        Go to products
      </Link>
    </main>
  );
}