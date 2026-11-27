"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/nav";
import { Asset } from "@/components/ui/asset";

const entries = nav.flatMap((page) => [
  { href: page.href, label: page.label, page: "Page" },
  ...page.sections.map((s) => ({ href: `${page.href}#${s.id}`, label: s.label, page: page.label })),
]);

export function Search({ shortcut = false }: { shortcut?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const results = entries.filter((e) => `${e.label} ${e.page}`.toLowerCase().includes(term));

  const open = () => {
    setQuery("");
    dialog.current?.showModal();
  };

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || target.closest("input, textarea, [contenteditable]")) return;
      // Nothing opens over the intro.
      if (target.ownerDocument.documentElement.classList.contains("candid-intro")) return;
      if (target.ownerDocument.querySelector("dialog[open]")) return;
      // The sidebar is hidden on small screens, where there is nothing to open.
      if (!dialog.current?.parentElement?.offsetParent || dialog.current.open) return;
      event.preventDefault();
      setQuery("");
      dialog.current.showModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  return (
    <div>
      <button
        type="button"
        onClick={open}
        aria-keyshortcuts={shortcut ? "/" : undefined}
        className="flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-full bg-brand-paper-200 px-2.5 text-[13.5px] tracking-[-0.01em] text-brand-ink-600"
      >
        <Asset name="37cca.svg" width={15} height={15} />
        Search the system
      </button>
      <dialog
        ref={dialog}
        aria-label="Search the system"
        data-lenis-prevent
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="mx-auto mt-[12vh] w-[min(560px,calc(100%-32px))] rounded-xl bg-ui-white p-0 text-ui-text shadow-2xl backdrop:bg-brand-ink/20"
      >
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the system"
          aria-label="Search the system"
          className="w-full border-b border-ui-rule px-5 py-4 text-base"
        />
        <ul className="scrollbar-hover max-h-[50vh] overflow-y-auto p-2">
          {results.map((result) => (
            <li key={result.href}>
              <Link
                href={result.href}
                scroll={!result.href.startsWith(`${pathname}#`)}
                onClick={() => dialog.current?.close()}
                className="flex justify-between gap-4 rounded-md px-3 py-2 text-sm hover:bg-ui-panel"
              >
                <span>{result.label}</span>
                <span className="text-ui-muted">{result.page}</span>
              </Link>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-2 text-sm text-ui-muted">No results</li>}
        </ul>
      </dialog>
    </div>
  );
}
