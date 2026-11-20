import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`h-full rounded-[2px] border border-line bg-surface p-6 ${className}`}>
      {children}
    </div>
  );
}
