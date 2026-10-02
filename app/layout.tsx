import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { CartHydrator } from "@/features/cart/components/cart-hydrator";
import { SITE_NAME, SITE_URL } from "@/lib/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Browse products, filter by category and price, and manage your cart.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen antialiased">
        <CartHydrator/>
        <Header />
        {children}
      </body>
    </html>
  );
}