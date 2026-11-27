"use client";

import Link from "next/link";
import { nav } from "@/lib/nav";
import { Asset } from "@/components/ui/asset";
import { useActiveSection } from "./use-active-section";

/** The page's subsections, shown beside the content while the sidebar is collapsed. */
export function PageNav({ pathname }: { pathname: string }) {
  const page = nav.find((item) => item.href === pathname) ?? nav[0];
  const active = useActiveSection(page.sections) ?? page.sections[0]?.id;

  return (
    <nav
      aria-label="On this page"
      className="absolute inset-y-0 left-0 hidden w-40 pt-[70px] pl-7.5 lg:collapsed:block"
    >
      <ul className="sticky top-27 flex flex-col gap-2.5">
        {page.sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <Link
                href={`${page.href}#${section.id}`}
                scroll={false}
                aria-current={current ? "location" : undefined}
                className="group flex items-center gap-2 text-[13px] leading-[20.4px] font-medium tracking-[-0.425px] whitespace-nowrap text-brand-ink-500 hover:text-ui-text aria-[current=location]:text-ui-text"
              >
                <span className="flex w-3 shrink-0">
                  {current ? (
                    <Asset name="d1c91.svg" width={10} height={2} />
                  ) : (
                    <>
                      <Asset name="5574c.svg" width={10} height={1} className="group-hover:hidden" />
                      <Asset name="61009.svg" width={12} height={1} className="hidden group-hover:block" />
                    </>
                  )}
                </span>
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
