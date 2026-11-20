import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

export function Row({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-6">
      <div className="w-full sm:w-[588px] sm:flex-shrink-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-2 text-h3 text-fg">{title}</h3>
      </div>
      <div className="w-full sm:w-[588px]">
        <div className="text-body-l text-fg-2">{children}</div>
      </div>
    </div>
  );
}
