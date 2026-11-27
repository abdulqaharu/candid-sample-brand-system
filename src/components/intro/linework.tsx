"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useEase } from "./use-ease";
import type { Fit } from "./layout";
import {
  CENTERLINE_FOOT,
  CENTERLINE_OVER,
  DIMENSION_Y,
  LABEL,
  LABEL_GAP,
  SLASH,
  STACKS,
  WITNESS_GAP,
  WITNESS_Y,
} from "./linework-geometry";
import { T } from "./timeline";

/** One vertical stroke, drawn from its foot upward. `unit` scales the centreline's dashes. */
function Upright({
  x,
  top,
  foot,
  range,
  p,
  dash,
  opacity,
}: {
  x: number;
  top: number;
  foot: number;
  range: readonly [number, number];
  p: MotionValue<number>;
  dash?: number;
  opacity: string;
}) {
  const drawn = useEase(p, range);
  const clipPath = useTransform(drawn, (t) => `inset(${(1 - t) * 100}% 0 0 0)`);
  const height = foot - top;

  return (
    <motion.div className="absolute w-0.75" style={{ left: x - 1.5, top, height, clipPath }}>
      <svg width="3" height={height} className={`block ${opacity}`}>
        <line
          x1="1.5"
          x2="1.5"
          y1="0"
          y2={height}
          className="stroke-brand-paper"
          strokeDasharray={dash ? [8, 3, 1, 3].map((n) => n * dash).join(" ") : undefined}
        />
      </svg>
    </motion.div>
  );
}

function Slash({ x, y, size, at, p }: { x: number; y: number; size: number; at: number; p: MotionValue<number> }) {
  const drawn = useEase(p, T.dimension);
  const opacity = useTransform(drawn, (t) => (t > 0 && t >= at ? 0.32 : 0));
  return (
    <motion.svg
      width={size * 2}
      height={size * 2}
      className="absolute overflow-visible"
      style={{ left: x - size, top: y - size, opacity }}
    >
      <line x1="0" y1={size * 2} x2={size * 2} y2="0" className="stroke-brand-paper" />
    </motion.svg>
  );
}

/**
 * The three stacks stand at one pitch: centrelines, witness lines, a dimension
 * and its label, drawn over the photo exactly as it is cropped. Opacities are
 * Plotter's: 0.14 centreline, 0.32 dimension, 0.72 label.
 */
export function Linework({ p, fit }: { p: MotionValue<number>; fit: Fit }) {
  const X = (x: number) => fit.x + x * fit.scale;
  const Y = (y: number) => fit.y + y * fit.scale;
  // One Plotter unit is two image pixels, as in the still.
  const unit = Math.max(1, 2 * fit.scale);
  const left = X(STACKS[0].x);
  const right = X(STACKS[STACKS.length - 1].x);
  const dimensionY = Y(DIMENSION_Y);

  const across = useEase(p, T.dimension);
  const dimensionClip = useTransform(across, (t) => `inset(0 ${(1 - t) * 100}% 0 0)`);
  const labelOpacity = useTransform(useEase(p, T.label), (t) => t * 0.72);
  const { start, stagger, length } = T.centrelines;

  return (
    <>
      {STACKS.map((stack, i) => (
        <Upright
          key={`c${stack.x}`}
          p={p}
          x={X(stack.x)}
          top={Y(stack.top - CENTERLINE_OVER)}
          foot={Y(CENTERLINE_FOOT)}
          range={[start + i * stagger, start + i * stagger + length]}
          dash={unit}
          opacity="opacity-14"
        />
      ))}
      {STACKS.map((stack) => (
        <Upright
          key={`w${stack.x}`}
          p={p}
          x={X(stack.x)}
          top={Y(WITNESS_Y)}
          foot={Y(stack.top - CENTERLINE_OVER - WITNESS_GAP)}
          range={T.witnesses}
          opacity="opacity-32"
        />
      ))}
      <motion.svg
        width={right - left}
        height="3"
        className="absolute"
        style={{ left, top: dimensionY - 1.5, clipPath: dimensionClip }}
      >
        <line x1="0" x2={right - left} y1="1.5" y2="1.5" className="stroke-brand-paper opacity-32" />
      </motion.svg>
      {STACKS.map((stack) => (
        <Slash
          key={`s${stack.x}`}
          p={p}
          x={X(stack.x)}
          y={dimensionY}
          size={(SLASH * fit.scale) / 2 + 1}
          at={(X(stack.x) - left) / (right - left)}
        />
      ))}
      <motion.p
        className="absolute -translate-y-1/2 leading-none whitespace-nowrap text-brand-paper"
        style={{ left: X(STACKS[2].x + LABEL_GAP), top: dimensionY, fontSize: fit.label, opacity: labelOpacity }}
      >
        {LABEL}
      </motion.p>
    </>
  );
}
