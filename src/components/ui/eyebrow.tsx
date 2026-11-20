import type { ReactNode } from "react";

export function Eyebrow({
  children,
  variant = "redline",
  className = "",
}: {
  children: ReactNode;
  variant?: "redline" | "muted";
  className?: string;
}) {
  const color = variant === "redline" ? "text-redline-text" : "text-fg-3";
  return (
    <p className={`text-label font-medium uppercase ${color} ${className}`}>
      {children}
    </p>
  );
}
