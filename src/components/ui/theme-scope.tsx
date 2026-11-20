import type { ReactNode } from "react";

export function ThemeScope({
  theme,
  children,
  className = "",
}: {
  theme: "light" | "dark";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-theme={theme} className={`theme-scope ${className}`}>
      {children}
    </div>
  );
}
