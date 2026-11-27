"use client";

import { useEffect, useState } from "react";
import { Search } from "./search";
import { ExpandButton } from "./sidebar-toggle";

const HEIGHT = 84;

/** Expand button and search, at the top left of the page while the sidebar is collapsed. */
export function SidebarToolbar() {
  // Over the title band the bar is clear. Past it, it needs its own background.
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => {
      const band = [...document.querySelectorAll("main > header")].find(
        (header) => header.getClientRects().length > 0,
      );
      setSolid(!!band && band.getBoundingClientRect().bottom < HEIGHT);
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      data-solid={solid || undefined}
      className="group/bar sidebar-motion pointer-events-none fixed top-0 right-0 left-(--sidebar-width) z-10 hidden h-21 items-start gap-[25px] border-b border-transparent pt-6 pl-[15px] data-solid:border-ui-rule data-solid:bg-ui-page lg:collapsed:flex"
    >
      <ExpandButton className="pointer-events-auto group-data-solid/bar:brightness-50" />
      <div className="pointer-events-auto w-[359px]">
        <Search shortcut />
      </div>
    </div>
  );
}
