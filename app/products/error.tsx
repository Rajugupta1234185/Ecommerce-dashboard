"use client";

import { RouteError, type RouteErrorProps } from "@/components/feedback/route-error";

export default function ProductDetailError(props: RouteErrorProps) {
  return (
    <RouteError
      {...props}
      title="We couldn't load this product"
      description="Something went wrong while fetching the product details. Please try again."
    />
  );
}