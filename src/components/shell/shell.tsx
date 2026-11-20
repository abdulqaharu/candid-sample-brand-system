import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TitleBand } from "./title-band";
import { PageFooter } from "./page-footer";

export function Shell({
  pathname,
  title,
  children,
}: {
  pathname: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <TitleBand>{title}</TitleBand>
        <div className="mx-auto w-full max-w-[1280px] flex-1 px-5 sm:px-10">
          {children}
        </div>
        <PageFooter pathname={pathname} />
      </main>
    </div>
  );
}
