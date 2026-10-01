"use client";

import { RouteError, type RouteErrorProps } from "@/components/feedback/route-error";

export default function AppError(props: RouteErrorProps) {
  return <RouteError {...props} />;
}