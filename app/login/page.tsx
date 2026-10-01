import { LoginForm } from "@/features/auth/components/login-form";
import { Metadata } from "next";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <section className="w-full rounded-lg border bg-surface p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Sign in to use your cart.
        </p>

        <LoginForm redirectTo={next ?? "/products"} />

        <p className="mt-6 text-xs text-muted-foreground">
          Demo account: <code className="rounded bg-muted px-1">mor_2314</code> /{" "}
          <code className="rounded bg-muted px-1">83r5^_</code>
        </p>
      </section>
    </main>
  );
}