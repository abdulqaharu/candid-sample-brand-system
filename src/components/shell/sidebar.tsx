"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, type NavSection } from "@/lib/nav";
import { Asset } from "@/components/ui/asset";
import { NavLine } from "./nav-line";
import { Search } from "./search";

/** The section being read: the last one whose top has passed the upper part of the view. */
function useActiveSection(sections: NavSection[]) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const update = () => {
      const atEnd = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      }
      setActive(atEnd && window.scrollY > 0 ? sections[sections.length - 1]?.id : current);
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  return active;
}

function Logo() {
  return (
    <Link href="/" aria-label="Candid, introduction" className="relative block h-16 w-[61px] overflow-hidden">
      <Asset
        name="6e1f2.png"
        width={1024}
        height={1024}
        className="absolute top-[-17.8%] left-[-21.21%] h-[140.2%] w-[146.82%] max-w-none"
      />
    </Link>
  );
}

function ToggleIcon() {
  return (
    <span aria-hidden className="relative block size-4.5">
      <span
        className="absolute inset-[8.33%_8.46%_8.33%_8.2%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.477px_-1.5px] mask-size-[18px_18px]"
        style={{ maskImage: 'url("/brand/78b25.svg")' }}
      >
        <span className="absolute inset-[-5%]">
          <Asset name="c0bb1.svg" width={17} height={17} className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
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
      {open ? (
        <aside className="sticky top-0 hidden h-screen w-58 shrink-0 flex-col overflow-y-auto border-r border-brand-paper-200 bg-ui-rail lg:flex">
          <div className="relative px-5 pt-6">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Hide sidebar"
              className="absolute top-9.5 right-3.5 flex size-7 cursor-pointer items-center justify-center rounded-md"
            >
              <ToggleIcon />
            </button>
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
              className="mb-3 flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-[9px] bg-ui-text/6 text-[13px] font-medium tracking-[-0.015em] hover:bg-ui-text/10"
            >
              <Asset name="bfdaa.svg" width={14} height={14} />
              Brand kit
            </Link>
            <p className="text-[11.5px] tracking-[-0.01em] text-ui-muted">Sample, Nov 2026</p>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Show sidebar"
          className="fixed top-4 left-4 z-20 hidden size-9 cursor-pointer items-center justify-center rounded-lg bg-ui-rail shadow lg:flex"
        >
          <ToggleIcon />
        </button>
      )}

      <div className="border-b border-brand-paper-200 bg-ui-rail lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 pt-4">
          <Logo />
          <div className="w-48">
            <Search />
          </div>
        </div>
        <nav aria-label="Pages" className="flex gap-5 overflow-x-auto px-5 py-3">
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
