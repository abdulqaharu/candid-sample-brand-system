"use client";

import { useState } from "react";
import { Asset } from "./asset";

export function CopyButton({ label, value }: { label: string; value: string }) {
  const [status, setStatus] = useState<string>();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("Copied");
    } catch {
      setStatus("Copy failed");
    }
    setTimeout(() => setStatus(undefined), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy for ${label}`}
      className="flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-ui-text/5 px-3 text-[13px] tracking-[-0.01em] text-ui-text-2 hover:bg-ui-text/10"
    >
      <Asset name="d688e.svg" width={13} height={13} />
      <span aria-live="polite">{status ?? label}</span>
    </button>
  );
}
