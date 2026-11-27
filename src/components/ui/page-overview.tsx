import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/** The short introduction at the top of a page. Its label is text, not a heading. */
export function PageOverview({ children }: { children: ReactNode }) {
  return (
    <section id="overview" className="py-12 md:py-19">
      <Reveal>
        <p className="text-[13px] tracking-[-0.01em] text-ui-text/60">Overview</p>
        <p className="max-w-160 pt-5 text-xl leading-[1.3] tracking-[-0.025em] text-ui-text min-[400px]:text-[22px] md:text-[30px]">
          {children}
        </p>
      </Reveal>
    </section>
  );
}
