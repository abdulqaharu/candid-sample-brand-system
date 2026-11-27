"use client";

import { useEffect, useState } from "react";
import { findSection } from "@/lib/find-section";
import type { NavSection } from "@/lib/nav";

/** The section being read: the last one whose top has passed the upper part of the view. */
export function useActiveSection(sections: NavSection[]) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const update = () => {
      const atEnd = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const element = findSection(id);
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
