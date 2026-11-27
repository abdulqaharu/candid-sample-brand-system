"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { nav } from "@/lib/nav";
import { Asset } from "@/components/ui/asset";
import { Logo } from "./logo";
import { NavLine } from "./nav-line";

type Icon = { name: string; width: number; height: number; place: string };

/** Each page's icon, placed inside its 18px box as in the design. */
const icons: Record<string, Icon> = {
  "/": { name: "6d15f.svg", width: 15, height: 15, place: "top-[1.05px] left-[1.24px] h-[15.46px] w-[14.87px]" },
  "/strategy": { name: "38092.svg", width: 18, height: 18, place: "top-0 left-0 size-[18px]" },
  "/color": { name: "f3f74.svg", width: 13, height: 16, place: "top-[0.85px] left-[2.35px] h-[16.3px] w-[13.3px]" },
  "/typography": { name: "af2d5.svg", width: 16, height: 16, place: "top-[0.85px] left-[0.85px] size-[16.3px]" },
  "/motion": { name: "0cc0c.svg", width: 16, height: 16, place: "top-[0.85px] left-[0.85px] size-[16.3px]" },
  "/layout": { name: "nav-layout.svg", width: 18, height: 18, place: "top-0 left-0 size-[18px]" },
  "/imagery": { name: "5a0a7.svg", width: 16, height: 16, place: "top-[0.85px] left-[0.85px] size-[16.3px]" },
  "/applications": { name: "040c5.svg", width: 14, height: 16, place: "top-[0.85px] left-[1.9px] h-[16.3px] w-[14.2px]" },
  "/resources": { name: "645f3.svg", width: 18, height: 18, place: "top-0 left-0 size-[18px]" },
};

/** The collapsed sidebar: logo and one icon per page. */
export function SidebarRail({ pathname }: { pathname: string }) {
  const list = useRef<HTMLUListElement>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const point = (event: { target: EventTarget }) =>
    setHoverKey((event.target as Element).closest("[data-nav]")?.getAttribute("data-nav") ?? null);

  return (
    <div className="hidden w-18 flex-col items-start collapsed:flex">
      <Logo className="mx-auto mt-6 h-[38px] w-[36px]" />
      <nav aria-label="Pages" className="px-4 pt-4 pb-8">
        <ul
          ref={list}
          onPointerOver={point}
          onPointerLeave={() => setHoverKey(null)}
          onFocus={point}
          onBlur={() => setHoverKey(null)}
          className="relative pl-3"
        >
          <NavLine list={list} activeKey={pathname} hoverKey={hoverKey} />
          {nav.map((item) => {
            const active = item.href === pathname;
            const icon = icons[item.href];
            const tone = active ? "brightness-0" : "group-hover:brightness-0";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-nav={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className="group relative flex h-11 w-7 items-center rounded-md px-1"
                >
                  <span className="relative block size-4.5">
                    <Asset
                      name={icon.name}
                      width={icon.width}
                      height={icon.height}
                      className={`absolute max-w-none ${icon.place} ${tone}`}
                    />
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-full ml-5 rounded-md bg-ui-text px-2 py-1 text-xs whitespace-nowrap text-ui-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
