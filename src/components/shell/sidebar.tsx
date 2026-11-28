"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { nav } from "@/lib/nav";
import { Asset } from "@/components/ui/asset";
import { Logo } from "./logo";
import { NavLine } from "./nav-line";
import { Search } from "./search";
import { SidebarHandle } from "./sidebar-handle";
import { SidebarRail } from "./sidebar-rail";
import { CollapseButton } from "./sidebar-toggle";
import { SidebarToolbar } from "./sidebar-toolbar";
import { useActiveSection } from "./use-active-section";

export function Sidebar() {
  const pathname = usePathname();
  const page = nav.find((item) => item.href === pathname) ?? nav[0];
  const activeSection = useActiveSection(page.sections);
  const list = useRef<HTMLDivElement>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  // The section can lag one frame behind a page change, so fall back to the first.
  const section = page.sections.find((s) => s.id === activeSection) ?? page.sections[0];
  const activeKey = section ? `${page.href}#${section.id}` : page.href;

  const point = (event: { target: EventTarget }) =>
    setHoverKey((event.target as Element).closest("[data-nav]")?.getAttribute("data-nav") ?? null);

  return (
    <>
      <aside className="sidebar-motion sticky top-0 z-20 hidden h-screen w-(--sidebar-width) shrink-0 overflow-clip border-r border-brand-paper-200 bg-ui-rail lg:block collapsed:overflow-visible">
        <SidebarRail pathname={page.href} />
        <div data-lenis-prevent className="scrollbar-hover flex h-full w-58 flex-col overflow-y-auto [scrollbar-gutter:auto] collapsed:hidden">
          <div className="relative px-5 pt-6">
            <Logo className="h-16 w-[61px]" />
            <CollapseButton className="absolute top-9.5 right-3.5" />
            <div className="pt-8">
              <Search shortcut />
            </div>
          </div>
          <nav aria-label="Pages" className="px-4 pt-4 pb-8">
            <div
              ref={list}
              onPointerOver={point}
              onPointerLeave={() => setHoverKey(null)}
              onFocus={point}
              onBlur={() => setHoverKey(null)}
              // A click can reflow the list, which would leave the hover shape behind.
              onClick={() => setHoverKey(null)}
              className="relative pl-4.5"
            >
              <NavLine list={list} activeKey={activeKey} hoverKey={hoverKey} />
              {nav.map((item) => {
              const active = item.href === page.href;
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    data-nav={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex h-9 items-center rounded-md px-1 text-sm tracking-[-0.015em] text-ui-muted hover:text-ui-text aria-[current=page]:font-semibold aria-[current=page]:text-ui-text"
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <ul className="pb-1.5 pl-3">
                      {item.sections.map((section) => (
                        <li key={section.id}>
                          <Link
                            href={`${item.href}#${section.id}`}
                            scroll={false}
                            data-nav={`${item.href}#${section.id}`}
                            aria-current={activeSection === section.id ? "location" : undefined}
                            className="block rounded-md px-1 py-1.25 text-[13px] leading-normal tracking-[-0.01em] text-ui-text/55 hover:text-ui-text aria-[current=location]:font-medium aria-[current=location]:text-ui-text"
                          >
                            {section.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            </div>
          </nav>
          <div className="mt-auto flex flex-col gap-1.5 px-5 pb-5">
            <Link
              href="/resources#downloads"
              scroll={pathname !== "/resources"}
              className="mb-3 flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-[9px] bg-ui-text/6 text-[13px] font-medium tracking-[-0.015em] hover:bg-ui-text/10"
            >
              <Asset name="bfdaa.svg" width={14} height={14} />
              Brand kit
            </Link>
            <p className="text-[11.5px] tracking-[-0.01em] text-ui-muted">Sample, Nov 2026</p>
          </div>
        </div>
      </aside>
      <SidebarHandle />
      <SidebarToolbar />

      <div className="sticky top-0 z-10 sm:static border-b border-brand-paper-200 bg-ui-rail lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 pt-4">
          <Logo className="h-16 w-[61px]" />
          <div className="w-48">
            <Search />
          </div>
        </div>
        <nav aria-label="Pages" className="fade-x flex gap-5 overflow-x-auto px-5 py-5 sm:py-3 mt-2 sm:mt-0">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === page.href ? "page" : undefined}
              className="shrink-0 py-1 text-sm text-ui-muted aria-[current=page]:font-semibold aria-[current=page]:text-ui-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
