import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[2px] px-[18px] py-3 text-body-m font-medium focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-redline text-on-accent"
      : "border border-line-strong text-fg bg-transparent";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
