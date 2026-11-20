import type { ReactNode } from "react";

export function TitleBand({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[280px] flex-col justify-between bg-surface px-5 pt-7 pb-10 sm:px-10 lg:min-h-[460px] lg:px-10 lg:pt-8">
      <div className="flex items-baseline justify-between text-fg">
        <p className="text-[17px] font-semibold">Candid</p>
        <p className="text-[13px] text-fg-2">Sample for review, November 2026</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
