import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading product...</span>
      <Skeleton className="h-4 w-32" />
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </main>
  );
}