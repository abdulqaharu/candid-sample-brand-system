"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { nav } from "@/lib/nav";
import { ThemeSwitcher } from "./theme-switcher";

export function Sidebar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <>
      <aside className="hidden w-[232px] shrink-0 flex-col border-r border-line bg-surface lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="px-6 pt-8">
          <p className="text-[15px] font-semibold text-fg">Candid</p>
          <p className="mt-0.5 text-[12.5px] text-fg-3">Brand system</p>
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-1 px-4" aria-label="Pages">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-[2px] px-3 py-2 text-[14px] text-fg-3 hover:text-fg focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2 aria-[current=page]:font-medium aria-[current=page]:text-fg"
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId={reduced ? undefined : "sidebar-active-indicator"}
                    className="absolute left-0 top-1 bottom-1 w-[2px] bg-fg"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                <span className="pl-3">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-6">
          <ThemeSwitcher />
          <p className="mt-4 text-[11.5px] text-fg-3">Prepared by Abdulqahar Usman</p>
        </div>
      </aside>

      <div className="flex flex-col border-b border-line bg-surface lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-[15px] font-semibold text-fg">Candid</p>
            <p className="text-[12.5px] text-fg-3">Brand system</p>
          </div>
          <ThemeSwitcher />
        </div>
        <nav
          className="flex gap-4 overflow-x-auto px-5 pb-4"
          aria-label="Pages"
        >
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 whitespace-nowrap rounded-[2px] px-1 py-1 text-[14px] text-fg-3 hover:text-fg focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2 aria-[current=page]:font-medium aria-[current=page]:text-fg"
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
