import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger" | "danger-ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  outline: "border bg-surface text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  danger: "bg-danger text-danger-foreground hover:bg-danger-hover",
  "danger-ghost": "text-danger hover:bg-danger/10",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className = "",
}: ButtonStyleOptions = {}): string {
  return [BASE, VARIANTS[variant], SIZES[size], className].filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Omit<ButtonStyleOptions, "className">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}