import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div aria-busy="true" className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <span className="sr-only">Loading your cart...</span>

      <div className="space-y-5 rounded-xl border bg-surface p-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="size-24 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-56 rounded-xl" />
    </div>
  );
}