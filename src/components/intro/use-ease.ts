"use client";

import { cubicBezier, useTransform, type MotionValue } from "framer-motion";

/** The brand's lift curve. */
export const lift = cubicBezier(0.32, 0.72, 0, 1);

/** 0 to 1 across a range of scroll progress, on the brand curve. */
export function useEase(p: MotionValue<number>, [from, to]: readonly [number, number]) {
  return useTransform(p, [from, to], [0, 1], { ease: lift });
}
