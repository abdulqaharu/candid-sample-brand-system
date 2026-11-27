/** Whether the visitor has paused the Motion page's demos, remembered between visits. */
const KEY = "candid-motion-paused";
const listeners = new Set<() => void>();
/** The choice for this visit, for when storage cannot be used. */
let chosen: boolean | undefined;

export function isPaused() {
  if (chosen !== undefined) return chosen;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setPaused(paused: boolean) {
  chosen = paused;
  try {
    localStorage.setItem(KEY, paused ? "1" : "0");
  } catch {
    // Remembered for this visit only.
  }
  for (const listener of listeners) listener();
}

export function subscribePaused(change: () => void) {
  listeners.add(change);
  return () => {
    listeners.delete(change);
  };
}
