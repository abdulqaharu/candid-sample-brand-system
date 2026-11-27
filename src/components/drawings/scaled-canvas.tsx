"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Draws fixed-size artwork and scales it to the width available. */
export function ScaledCanvas({
  width,
  height,
  label,
  children,
}: {
  width: number;
  height: number;
  label?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setScale(entry.contentRect.width / width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={`absolute top-0 left-0 origin-top-left ${scale === undefined ? "invisible" : ""}`}
        style={{ width, height, transform: `scale(${scale ?? 1})` }}
      >
        {children}
      </div>
    </div>
  );
}
