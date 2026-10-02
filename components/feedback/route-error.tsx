"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { ErrorState } from "./error-state";

export type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

type RouteErrorViewProps = RouteErrorProps & {
  title?: string;
  description?: string;
};

export function RouteError({ error, reset, title, description }: RouteErrorViewProps) {
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  function retry() {
    startTransition(() => {
      router.refresh();
      reset(); 
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <ErrorState
        title={title}
        description={description}
        onRetry={retry}
        isRetrying={isRetrying}
      />
    </main>
  );
}