import Link from "next/link";
import { cookies } from "next/headers";
import { Button, buttonStyles } from "@/components/ui/button";
import { CartIcon } from "@/components/ui/icons";
import { logoutAction } from "@/features/auth/actions/auth.actions";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { NavLink } from "./nav-link";
import { CartBadge } from "@/features/cart/components/cart-badge";

export async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has(AUTH_COOKIE);

  return (
    <header className="sticky top-0 z-40 border-b bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:gap-6">
        <Link
          href="/products"
          aria-label="Shop Dashboard home"
          className="flex items-center gap-2.5"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground"
          >
            S
          </span>
          <span className="hidden text-base font-bold tracking-tight sm:inline">
            Shop Dashboard
          </span>
        </Link>

        <nav aria-label="Main" className="flex flex-1 items-center gap-1">
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/cart">
            <CartIcon className="size-[18px]" />
            <span>Cart</span>
            {isLoggedIn && <CartBadge/>}
          </NavLink>
        </nav>

        {isLoggedIn ? (
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        ) : (
          <Link href="/login" className={buttonStyles({ size: "sm" })}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}