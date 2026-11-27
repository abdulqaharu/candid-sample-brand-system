"use client";

import { useSyncExternalStore } from "react";
import { isPaused, setPaused, subscribePaused } from "@/lib/motion-paused";

/** Stops, or restarts, every demo loop on the page. */
export function PauseToggle() {
  const paused = useSyncExternalStore(subscribePaused, isPaused, () => false);

  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
      className="flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-ui-text/5 px-3 text-[13px] tracking-[-0.01em] text-ui-text-2 hover:bg-ui-text/10"
    >
      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" className="fill-current">
        {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2.2v8H2zM5.8 1H8v8H5.8z" />}
      </svg>
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );
}
