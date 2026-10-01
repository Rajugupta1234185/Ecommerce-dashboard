import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/cart-view";
import { ErrorBoundary } from "@/components/feedback/error-boundary";


export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false }, 
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Your cart</h1>
      <ErrorBoundary
        title="We couldn't display your cart"
        description="Your items are safe. Please try again."
      >
        <CartView />
      </ErrorBoundary>
    </main>
  );
}