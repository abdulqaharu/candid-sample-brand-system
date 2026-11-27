"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  isCollapsed,
  setCollapsed,
  SIDEBAR_FULL,
  SIDEBAR_RAIL,
  useCollapsed,
} from "@/lib/sidebar-state";
import { Asset } from "@/components/ui/asset";

/** Movement below this is a click, not a drag. */
const SLOP = 4;
/** Drag this far toward the other state and releasing switches to it. */
const SWITCH = 48;

/**
 * The draggable edge between the sidebar and the page. Hovering lights it up,
 * holding shows which way it can go, and Enter toggles it from the keyboard.
 */
export function SidebarHandle() {
  const collapsed = useCollapsed();
  const [held, setHeld] = useState(false);
  const light = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ x: number; from: boolean; moved: boolean } | null>(null);

  const follow = (y: number) => {
    if (light.current) light.current.style.transform = `translateY(${y}px)`;
  };

  const down = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    // Otherwise the browser can start selecting or dragging, which cancels the resize.
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    follow(event.clientY);
    drag.current = { x: event.clientX, from: isCollapsed(), moved: false };
    setHeld(true);
  };

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    follow(event.clientY);
    const current = drag.current;
    if (!current) return;
    const distance = event.clientX - current.x;
    if (!current.moved && Math.abs(distance) < SLOP) return;
    current.moved = true;

    const start = current.from ? SIDEBAR_RAIL : SIDEBAR_FULL;
    const width = Math.min(SIDEBAR_FULL, Math.max(SIDEBAR_RAIL, start + distance));
    const root = document.documentElement;
    root.dataset.dragging = "";
    root.style.setProperty("--sidebar-width", `${width}px`);

    // Show the state that releasing here would give.
    const switched = current.from ? distance > SWITCH : distance < -SWITCH;
    setCollapsed(switched ? !current.from : current.from, { save: false });
  };

  /** Ends a hold. A cancelled drag goes back to where it started. */
  const end = (keep: boolean) => {
    const current = drag.current;
    if (!current) return;
    drag.current = null;
    setHeld(false);
    if (!current.moved) return;
    const root = document.documentElement;
    delete root.dataset.dragging;
    root.style.removeProperty("--sidebar-width");
    setCollapsed(keep ? isCollapsed() : current.from);
  };

  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      data-held={held || undefined}
      // Pointer clicks only reveal the arrow. A detail of 0 means the keyboard.
      onClick={(event) => event.detail === 0 && setCollapsed(!collapsed)}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) follow(window.innerHeight / 2);
      }}
      onPointerEnter={(event) => follow(event.clientY)}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={() => end(true)}
      onPointerCancel={() => end(false)}
      onLostPointerCapture={() => end(false)}
      className="group sidebar-motion fixed inset-y-0 left-[calc(var(--sidebar-width)-8px)] z-30 hidden w-4 cursor-col-resize touch-none outline-none lg:block"
    >
      <span ref={light} aria-hidden className="pointer-events-none absolute top-0 left-0 block">
        <Asset
          name="7ee9f.svg"
          width={1}
          height={252}
          className="absolute top-[-116px] left-[7px] h-[252px] w-px max-w-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-held:opacity-0 motion-reduce:transition-none"
        />
        {/* The line sits 13px into this drawing, so it mirrors around that point. */}
        <Asset
          name="747b3.svg"
          width={18}
          height={72}
          className={`absolute top-[-36px] left-[-5.5px] h-[72px] w-[18px] max-w-none origin-[13px_50%] opacity-0 group-data-held:opacity-100 ${collapsed ? "-scale-x-100" : ""}`}
        />
      </span>
    </button>
  );
}
