import { useSyncExternalStore } from "react";

/**
 * Whether the sidebar is collapsed to its icon rail. The value lives in
 * `data-sidebar` on <html>, so CSS can follow it and it is right before paint.
 * The widths are also in globals.css as `--sidebar-width`.
 */
export const SIDEBAR_FULL = 232;
export const SIDEBAR_RAIL = 72;

const KEY = "candid-sidebar";

const listeners = new Set<() => void>();

export const isCollapsed = () => document.documentElement.dataset.sidebar === "collapsed";

export function setCollapsed(collapsed: boolean, { save = true } = {}) {
  const value = collapsed ? "collapsed" : "expanded";
  document.documentElement.dataset.sidebar = value;
  if (save) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Storage can be blocked. The sidebar still works for this visit.
    }
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCollapsed() {
  return useSyncExternalStore(subscribe, isCollapsed, () => false);
}
