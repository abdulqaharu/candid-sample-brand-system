import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({
  id,
  title,
  description,
  aside,
  first = false,
  children,
}: {
  id: string;
  title: string;
  description?: ReactNode;
  /** Extra content under the description, in the right column. */
  aside?: ReactNode;
  first?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`border-t ${first ? "border-transparent" : "border-ui-rule"} ${children ? "pb-19" : ""}`}
    >
      <Reveal className="grid gap-6 py-12 md:grid-cols-2 md:py-19">
        <h2 id={`${id}-title`} className="text-2xl leading-[1.2] font-medium tracking-[-0.025em]">
          {title}
        </h2>
        <div>
          {description && <Lead>{description}</Lead>}
          {aside}
        </div>
      </Reveal>
      {children && (
        <Reveal delay={0.08} className="md:pt-14">
          {children}
        </Reveal>
      )}
    </section>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[612px] text-[17px] leading-[1.42] tracking-[-0.01em] text-ui-text-2">{children}</p>
  );
}
