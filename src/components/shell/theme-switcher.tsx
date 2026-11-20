"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "candid-theme";
const EVENT = "candid-theme-change";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable, theme still applies for this session
  }
  document.documentElement.setAttribute("data-theme", theme);
  window.dispatchEvent(new Event(EVENT));
}

const options: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelect = useCallback((value: Theme) => {
    if (value !== theme) setTheme(value);
  }, [theme]);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-0.5 rounded-[8px] bg-raised p-[3px]"
    >
      {options.map((option) => {
        const selected = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => handleSelect(option.value)}
            className="relative flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-body-s focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {selected && (
              <motion.span
                layoutId={reduced ? undefined : "theme-switcher-thumb"}
                className="absolute inset-0 rounded-[6px] border border-line bg-canvas shadow-[0_1px_2px_rgb(0_0_0_/_0.08)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span
              className={`relative z-10 ${selected ? "text-fg" : "text-fg-2"}`}
              aria-hidden
            >
              {option.value === "light" ? <SunIcon /> : <MoonIcon />}
            </span>
            <span className={`relative z-10 ${selected ? "text-fg" : "text-fg-2"}`}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.3" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M7 0.8V2.3" />
        <path d="M7 11.7V13.2" />
        <path d="M0.8 7H2.3" />
        <path d="M11.7 7H13.2" />
        <path d="M2.4 2.4L3.4 3.4" />
        <path d="M10.6 10.6L11.6 11.6" />
        <path d="M11.6 2.4L10.6 3.4" />
        <path d="M3.4 10.6L2.4 11.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M12.3 8.4A5.3 5.3 0 1 1 5.6 1.7a5.3 5.3 0 0 0 6.7 6.7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
