import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again. If the problem continues, come back in a few minutes.",
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-lg rounded-xl border bg-surface px-6 py-12 text-center"
    >
      <div
        aria-hidden="true"
        className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-danger/10 text-xl font-bold text-danger"
      >
        !
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{description}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {onRetry && (
          <Button onClick={onRetry} disabled={isRetrying}>
            {isRetrying ? "Retrying..." : "Try again"}
          </Button>
        )}
        <Link href="/products" className={buttonStyles({ variant: "outline" })}>
          Back to products
        </Link>
      </div>
    </div>
  );
}