"use client";

import { useRef, type ReactNode } from "react";

/** A tile that opens in a larger view. */
export function Zoomable({ label, children }: { label: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Enlarge: ${label}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-lg bg-ui-panel text-left"
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        aria-label={label}
        data-lenis-prevent
        onClick={() => dialog.current?.close()}
        className="m-auto w-[96vw] max-w-[min(96vw,160vh)] cursor-zoom-out overflow-hidden rounded-lg bg-transparent p-0 backdrop:bg-brand-ink/85"
      >
        <button type="button" aria-label="Close" className="block w-full cursor-zoom-out text-left">
          {children}
        </button>
      </dialog>
    </>
  );
}
