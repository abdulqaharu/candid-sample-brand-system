/** Where things sit for a given viewport. Pure functions, no DOM. */
import { LABEL_GAP, LABEL_SIZE, PHOTO, STACK_SPAN, STACKS } from "./linework-geometry";

export type Rect = { x: number; y: number; w: number; h: number };
/** A point of the full-bleed layer to hold at a window's centre, and the layer's scale. */
export type View = { k: number; cx: number; cy: number };

/** The headline's size: clamp(48px, 6vw, 96px), scaled down on phones. */
export const headlineSize = (width: number) =>
  width < 640 ? width * 0.1 : Math.min(96, Math.max(48, width * 0.06));

/** The photo's cover fit: its scale and offset in the viewport. */
export function coverFit(width: number, height: number, labelWidthPerPx: number) {
  const scale = Math.max(width / PHOTO.width, height / PHOTO.height);
  const drawn = { w: PHOTO.width * scale, h: PHOTO.height * scale };
  const label = Math.max(12, LABEL_SIZE * scale);
  let x = (width - drawn.w) / 2;
  // On a narrow screen, slide the crop so the stacks and their label stay in view.
  const start = STACK_SPAN.left * scale;
  const end = (STACKS[2].x + LABEL_GAP) * scale + labelWidthPerPx * label;
  if (x + start < 12 || x + end > width - 12) {
    x = Math.min(0, Math.max(width - drawn.w, width / 2 - (start + end) / 2));
  }
  return { scale, x, y: (height - drawn.h) / 2, ...drawn, label };
}
export type Fit = ReturnType<typeof coverFit>;

export function layoutFor(width: number, height: number, labelWidthPerPx: number) {
  const fit = coverFit(width, height, labelWidthPerPx);
  const font = headlineSize(width);
  const em = font / 96;
  const sliver = { w: 90 * em, h: 96 * em, gap: 28 * em };

  // Phones keep the middle photo and half of each side photo.
  const strip = width < 768 ? width / 680 : Math.min(1, (width - 48) / 940);
  const middle = { w: 380 * strip, h: 250 * strip };
  const side = { w: 260 * strip, h: 170 * strip, offset: (380 / 2 + 20 + 260 / 2) * strip };
  const centre = { x: width / 2, y: height / 2 };

  // The slivers look at the stacks; the strip and the full bleed look at the whole frame.
  const stacks: Rect = {
    x: fit.x + STACK_SPAN.left * fit.scale,
    y: fit.y + 150 * fit.scale,
    w: (STACK_SPAN.right - STACK_SPAN.left) * fit.scale,
    h: 640 * fit.scale,
  };
  const closeUp: View = {
    // The whole height of the stacks, with what stands around them.
    k: Math.min(sliver.w / stacks.w, sliver.h / stacks.h),
    cx: stacks.x + stacks.w / 2,
    cy: stacks.y + stacks.h / 2,
  };
  const wide: View = {
    k: Math.max(middle.w / width, middle.h / height),
    cx: Math.min(width * 0.75, Math.max(width * 0.25, stacks.x + stacks.w / 2)),
    cy: height / 2,
  };
  const full: View = { k: 1, cx: width / 2, cy: height / 2 };

  return { width, height, fit, font, sliver, middle, side, centre, closeUp, wide, full };
}
export type Layout = ReturnType<typeof layoutFor>;

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: mix(a.x, b.x, t),
  y: mix(a.y, b.y, t),
  w: mix(a.w, b.w, t),
  h: mix(a.h, b.h, t),
});
export const mixView = (a: View, b: View, t: number): View => ({
  k: mix(a.k, b.k, t),
  cx: mix(a.cx, b.cx, t),
  cy: mix(a.cy, b.cy, t),
});

/**
 * Shows the full-bleed photo through a window: the layer is moved and scaled so
 * the view's point sits at the window's centre, then clipped to the window.
 */
export function throughWindow(window: Rect, view: View, { width, height }: Layout) {
  if (window.w < 0.5 || window.h < 0.5) {
    return { transform: "none", clipPath: "inset(50% 50% 50% 50%)" };
  }
  const k = Math.max(view.k, window.w / width, window.h / height);
  const w = window.w / k;
  const h = window.h / k;
  const cx = Math.min(width - w / 2, Math.max(w / 2, view.cx));
  const cy = Math.min(height - h / 2, Math.max(h / 2, view.cy));
  // Square off as the window reaches the edges of the screen.
  const radius = (4 * Math.min(1, Math.max(0, width - window.w) / (width * 0.3))) / k;
  const x = window.x + window.w / 2 - cx * k;
  const y = window.y + window.h / 2 - cy * k;
  const inset = [cy - h / 2, width - cx - w / 2, height - cy - h / 2, cx - w / 2];
  return {
    transform: `translate(${x}px, ${y}px) scale(${k})`,
    clipPath: `inset(${inset.map((v) => `${Math.max(0, v)}px`).join(" ")} round ${radius}px)`,
  };
}
