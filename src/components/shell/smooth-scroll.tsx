"use client";

import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { findSection } from "@/lib/find-section";

/**
 * Glides to a section when a link to one on this page is clicked. Those links use
 * `scroll={false}`, so Next does not jump there first.
 */
function SectionLinks() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onClick = (event: MouseEvent) => {
      // Modified clicks open the link somewhere else.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href);
      const here = window.location;
      if (url.origin !== here.origin || url.pathname !== here.pathname || !url.hash) return;
      const section = findSection(decodeURIComponent(url.hash.slice(1)));
      if (section) lenis.scrollTo(section);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/** Smooth scrolling for the whole page. Lenis turns it off for reduced motion. */
export function SmoothScroll() {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.1, stopInertiaOnNavigate: true }}>
      <SectionLinks />
    </ReactLenis>
  );
}
