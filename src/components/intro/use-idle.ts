"use client";

import type { MotionValue } from "framer-motion";
import { useCallback, useSyncExternalStore } from "react";

/** True before any scroll, and again after scrolling all the way back. */
export function useIdle(p: MotionValue<number>) {
  const subscribe = useCallback((change: () => void) => p.on("change", change), [p]);
  const isIdle = () => p.get() <= 0.0005;
  return useSyncExternalStore(subscribe, isIdle, isIdle);
}
