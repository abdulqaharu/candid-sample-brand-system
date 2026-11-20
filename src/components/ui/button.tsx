import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
  size?: "default" | "compact";
};

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[2px] font-medium focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2";
  const sizing = size === "compact" ? "px-3 py-1.5 text-[11px]" : "px-[18px] py-3 text-body-m";
  const styles =
    variant === "primary"
      ? "bg-redline text-on-accent"
      : "border border-line-strong text-fg bg-transparent";
  return <button className={`${base} ${sizing} ${styles} ${className}`} {...props} />;
}
