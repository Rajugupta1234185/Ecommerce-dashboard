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
    // In a real product, send this to Sentry/Datadog. `digest` matches the server log.
    console.error(error);
  }, [error]);

  function retry() {
    startTransition(() => {
      router.refresh(); // re-run the server component (refetch)
      reset(); // then re-render the segment
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