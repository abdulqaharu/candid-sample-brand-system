"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useId, useRef, type RefObject } from "react";

type Point = [x: number, y: number];
type Curve = [Point, Point, Point, Point];

/** The indentation, taken from the Figma vector (node 78:866). */
const outline: Curve[] = [
  [[0.5, 214.522], [0.5, 218.768], [3.64954, 223.1], [4.94924, 227.527]],
  [[4.94924, 227.527], [5.60671, 229.766], [5.09145, 232.121], [4.29283, 234.314]],
  // The straight flank, written as a curve so every piece is handled alike.
  [[4.29283, 234.314], [3.43094, 236.681], [2.56906, 239.048], [1.70717, 241.415]],
  [[1.70717, 241.415], [0.908554, 243.608], [0.5, 245.924], [0.5, 248.258]],
];

const MIDDLE = (214.522 + 248.258) / 2;
/** Bumps closer than this are drawn as one. */
const MERGE = 6;

type Bump = { y: number; depth: number };

function place({ y, depth }: Bump) {
  const move = ([px, py]: Point): Point => [0.5 + (px - 0.5) * depth, py - MIDDLE + y];
  return outline.map((curve) => curve.map(move) as Curve);
}

/** Splits a curve in two at t (de Casteljau). */
function split([a, b, c, d]: Curve, t: number): [Curve, Curve] {
  const mix = (p: Point, q: Point): Point => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const ab = mix(a, b);
  const bc = mix(b, c);
  const cd = mix(c, d);
  const abc = mix(ab, bc);
  const bcd = mix(bc, cd);
  const middle = mix(abc, bcd);
  return [
    [a, ab, abc, middle],
    [middle, bcd, cd, d],
  ];
}

/** The t at which a curve reaches a height. Each piece only ever runs downward. */
function reach(curve: Curve, y: number) {
  let low = 0;
  let high = 1;
  for (let i = 0; i < 20; i++) {
    const t = (low + high) / 2;
    if (split(curve, t)[0][3][1] < y) low = t;
    else high = t;
  }
  return low;
}

/** The part of a bump between two heights. */
function clip(curves: Curve[], from: number, to: number) {
  return curves.flatMap((curve) => {
    if (curve[3][1] <= from || curve[0][1] >= to) return [];
    let part = curve;
    if (part[0][1] < from) part = split(part, reach(part, from))[1];
    if (part[3][1] > to) part = split(part, reach(part, to))[0];
    return [part];
  });
}

const point = ([x, y]: Point) => `${x.toFixed(3)} ${y.toFixed(3)}`;

/** One continuous line, bent wherever there is a bump. Neighbors meet halfway. */
function linePath(height: number, bumps: Bump[]) {
  const shown: Bump[] = [];
  for (const bump of bumps.filter((b) => b.depth > 0.001).sort((a, b) => a.y - b.y)) {
    const last = shown[shown.length - 1];
    if (!last || bump.y - last.y >= MERGE) shown.push(bump);
    else if (bump.depth > last.depth) shown[shown.length - 1] = bump;
  }

  let path = "M0.5 0";
  shown.forEach((bump, i) => {
    const from = i > 0 ? (shown[i - 1].y + bump.y) / 2 : -Infinity;
    const to = i < shown.length - 1 ? (bump.y + shown[i + 1].y) / 2 : Infinity;
    clip(place(bump), from, to).forEach(([a, b, c, d], index) => {
      if (index === 0) path += `L${point(a)}`;
      path += `C${point(b)} ${point(c)} ${point(d)}`;
    });
  });
  return `${path}L0.5 ${height}`;
}

// Where the shading starts and ends, measured from the middle of the active bump.
const SHADE_ABOVE = 40.8;
const SHADE_BELOW = 31.1;

const ease: [number, number, number, number] = [0.2, 0, 0, 1];

/**
 * The vertical line beside the navigation. Items mark themselves with `data-nav`:
 * the active one holds a shaded indentation, a hovered or focused one a faded one.
 */
export function NavLine({
  list,
  activeKey,
  hoverKey,
}: {
  list: RefObject<HTMLElement | null>;
  activeKey: string;
  hoverKey: string | null;
}) {
  const id = useId();
  const reduced = useReducedMotion();

  const height = useMotionValue(0);
  const activeY = useMotionValue(0);
  const activeDepth = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const hoverDepth = useMotionValue(0);
  const placed = useRef(false);

  const path = useTransform(() =>
    linePath(height.get(), [
      { y: activeY.get(), depth: activeDepth.get() },
      { y: hoverY.get(), depth: hoverDepth.get() },
    ]),
  );
  const shadeStart = useTransform(() => activeY.get() - SHADE_ABOVE);
  const shadeEnd = useTransform(() => activeY.get() + SHADE_BELOW);

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    // The observer also fires once on observe, which places the line the first time.
    const observer = new ResizeObserver(() => {
      height.set(element.offsetHeight);
      const target = element.querySelector<HTMLElement>(`[data-nav="${activeKey}"]`);
      if (!target || !element.offsetHeight) return;
      const box = target.getBoundingClientRect();
      const middle = box.top - element.getBoundingClientRect().top + box.height / 2;
      if (!placed.current || reduced) {
        placed.current = true;
        activeY.set(middle);
        activeDepth.set(1);
      } else {
        animate(activeY, middle, { type: "spring", stiffness: 500, damping: 38 });
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [list, activeKey, reduced, height, activeY, activeDepth]);

  useEffect(() => {
    const element = list.current;
    const target = hoverKey ? element?.querySelector<HTMLElement>(`[data-nav="${hoverKey}"]`) : null;
    const timing = { duration: reduced ? 0 : 0.15, ease };
    if (element && target) {
      const box = target.getBoundingClientRect();
      hoverY.set(box.top - element.getBoundingClientRect().top + box.height / 2);
      hoverDepth.set(0);
      const growing = animate(hoverDepth, 1, timing);
      return () => growing.stop();
    }
    const flattening = animate(hoverDepth, 0, timing);
    return () => flattening.stop();
  }, [list, hoverKey, reduced, hoverY, hoverDepth]);

  return (
    <svg aria-hidden className="pointer-events-none absolute top-0 left-0 h-full w-2 overflow-visible" fill="none">
      <defs>
        <motion.linearGradient id={id} gradientUnits="userSpaceOnUse" x1={0} x2={0} y1={shadeStart} y2={shadeEnd}>
          <stop stopColor="var(--ink-300)" />
          <stop offset="0.4615" stopColor="var(--ink-950)" />
          <stop offset="1" stopColor="var(--ink-300)" />
        </motion.linearGradient>
      </defs>
      {/* A single stroke: stacked strokes double their soft edges and look heavy. */}
      <motion.path d={path} stroke={`url(#${id})`} strokeLinejoin="round" shapeRendering="geometricPrecision" />
    </svg>
  );
}
