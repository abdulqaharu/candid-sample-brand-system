import type { ReactNode } from "react";
import { PageFooter } from "./page-footer";
import { PageNav } from "./page-nav";
import { PageOverview } from "@/components/ui/page-overview";
import { PageTitle } from "@/components/ui/page-title";
import { overviews } from "@/lib/overviews";

export function Shell({
  pathname,
  title,
  hero,
  children,
}: {
  pathname: string;
  title?: string;
  /** Replaces the standard title band. */
  hero?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {hero ?? (
        <header className="flex min-h-70 items-end overflow-hidden bg-brand-redline px-5 pt-20 pb-6 lg:min-h-115">
          <PageTitle
            lines={title ? [title] : []}
            className="text-[clamp(2.75rem,10vw,9.25rem)] leading-[0.92] font-medium tracking-[-0.05em] text-ui-white"
          />
        </header>
      )}
      {/* The padding makes up the width the sidebar gives away, so content holds still. */}
      <div className="sidebar-motion relative flex flex-1 flex-col lg:pl-[calc(232px-var(--sidebar-width))]">
        <PageNav pathname={pathname} />
        <div className="mx-auto w-full max-w-[1280px] flex-1 px-5 pb-37.5 sm:px-10">
          {overviews[pathname] && <PageOverview>{overviews[pathname]}</PageOverview>}
          {children}
        </div>
      </div>
      <div className="pt-30">
        <PageFooter pathname={pathname} />
      </div>
    </main>
  );
}
