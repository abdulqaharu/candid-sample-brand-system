import type { ReactNode } from "react";

export function SlideFrame({
  caption,
  slideNumber,
  blueprint = false,
  children,
}: {
  caption: string;
  slideNumber: number;
  blueprint?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className={`flex aspect-video flex-col justify-between overflow-hidden rounded-[2px] border border-line p-[4%] ${blueprint ? "bg-blueprint" : "bg-canvas"}`}
      >
        <div className="min-h-0 flex-1">{children}</div>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-fg-3">
            Candid
          </span>
          <span className="text-[8px] text-fg-3">{String(slideNumber).padStart(2, "0")}</span>
        </div>
      </div>
      <p className="mt-2 text-label text-fg-3">{caption}</p>
    </div>
  );
}
