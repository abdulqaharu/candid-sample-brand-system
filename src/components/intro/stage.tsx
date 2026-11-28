"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { mix, mixRect, mixView, throughWindow, type Layout, type Rect } from "./layout";
import { Linework } from "./linework";
import { T } from "./timeline";
import { useEase } from "./use-ease";
import { useIdle } from "./use-idle";

export const LINE_1 = "Concept to FID,";
export const LINE_2 = "in weeks.";
/** The caret's height against the cap height, which is 0.71 of Geist's size. */
const CARET = 0.82 * 0.71;

/** Widths measured from the set type: `line1[n]` is the width of the first n characters. */
export type Metrics = { line1: number[]; line2: number[] };
export type Target = { x: number; y: number; w: number; h: number } | null;

const typed = (p: number, [from, to]: readonly [number, number], length: number) =>
  Math.max(0, Math.min(length, Math.floor(((p - from) / (to - from)) * length + 1e-6)));

/** A line of type that shows whole characters only, by clipping to a measured width. */
function Line({
  text,
  x,
  width,
  opacity,
  layout,
}: {
  text: string;
  x: MotionValue<number>;
  width: MotionValue<number>;
  opacity: MotionValue<number>;
  layout: Layout;
}) {
  // The room above and below keeps ascenders and the comma's tail unclipped.
  const clipPath = useTransform(width, (w) => `inset(-20% calc(100% - ${w}px) -20% -5%)`);
  const visibility = useTransform(width, (w) => (w > 0 ? "visible" : "hidden"));
  return (
    <motion.p
      className="absolute left-0 leading-none font-medium tracking-[-0.02em] whitespace-pre text-ui-text"
      style={{
        top: layout.centre.y - layout.font / 2,
        fontSize: layout.font,
        x,
        opacity,
        clipPath,
        visibility,
      }}
    >
      {text}
    </motion.p>
  );
}

function SidePhoto({
  src,
  direction,
  p,
  layout,
}: {
  src: string;
  direction: -1 | 1;
  p: MotionValue<number>;
  layout: Layout;
}) {
  const out = useEase(p, T.sidesOut);
  const back = useEase(p, T.sidesBack);
  const x = useTransform(() => direction * layout.side.offset * out.get() * (1 - back.get()));
  // Hidden until the middle photo is large enough to slide out from behind.
  const visibility = useTransform(p, (v) => (v > T.sidesOut[0] && v < T.sidesBack[1] ? "visible" : "hidden"));
  const { w, h } = layout.side;
  return (
    <motion.div
      className="absolute overflow-hidden rounded-sm"
      style={{ left: layout.centre.x - w / 2, top: layout.centre.y - h / 2, width: w, height: h, x, visibility }}
    >
      <Image src={src} alt="" fill sizes={`${Math.ceil(w)}px`} loading="eager" className="object-cover" />
    </motion.div>
  );
}

/** Every frame of the sequence, as a function of progress. */
export function Stage({
  p,
  layout,
  metrics,
  target,
}: {
  p: MotionValue<number>;
  layout: Layout;
  metrics: Metrics;
  /** The logo the mark lands on, in viewport coordinates. */
  target: Target;
}) {
  const { width, height, centre, sliver, middle, font, fit } = layout;
  const caretGap = font / 12;
  const idle = useIdle(p);

  const open = useEase(p, T.sliverOpen);
  const grow = useEase(p, T.grow);
  const collapse = useEase(p, T.collapse);
  const close = useEase(p, T.sliverClose);
  const expand = useEase(p, T.expand);

  // The first line and the sliver stay centred as a pair.
  const width1 = useTransform(p, (v) => metrics.line1[typed(v, T.type1, LINE_1.length)]);
  const x1 = useTransform(() => (width - width1.get() - (sliver.gap + sliver.w) * open.get()) / 2);
  const opacity1 = useTransform(p, [...T.text1Out], [1, 0]);

  // So do the sliver and the second line.
  const width2 = useTransform(p, (v) => (v < T.type2[0] ? 0 : metrics.line2[typed(v, T.type2, LINE_2.length)]));
  const left2 = useTransform(() => (width - width2.get() - (sliver.gap + sliver.w) * (1 - close.get())) / 2);
  const x2 = useTransform(() => left2.get() + (sliver.gap + sliver.w) * (1 - close.get()));
  const opacity2 = useTransform(p, [...T.text2Out], [1, 0]);

  // Motion follows the values read on the first run, so every one is read every time.
  const caretX = useTransform(() => {
    const first = x1.get() + width1.get();
    const second = x2.get() + width2.get();
    const typing = p.get() < T.caret1Off;
    // On an empty line the caret stands where the headline will start from: the centre.
    if (typing && width1.get() === 0) return width / 2 - 2;
    return (typing ? first : second) + caretGap;
  });
  const caretOpacity = useTransform(p, (v) => (v < T.caret1Off || (v >= T.caret2[0] && v < T.caret2[1]) ? 1 : 0));

  // The plant photo is one layer seen through a window that moves from state to state.
  const plant = useTransform(() => {
    // All read up front, so that Motion follows each of them.
    const v = p.get();
    const [growing, collapsing, expanding] = [grow.get(), collapse.get(), expand.get()];
    const top = centre.y - sliver.h / 2;
    const first: Rect = {
      x: x1.get() + width1.get() + sliver.gap * open.get(),
      y: top,
      w: sliver.w * open.get(),
      h: sliver.h,
    };
    const strip: Rect = { x: centre.x - middle.w / 2, y: centre.y - middle.h / 2, w: middle.w, h: middle.h };
    const second: Rect = { x: left2.get(), y: top, w: sliver.w * (1 - close.get()), h: sliver.h };
    const full: Rect = { x: 0, y: 0, w: width, h: height };

    if (v < T.collapse[0]) {
      const t = growing;
      return throughWindow(mixRect(first, strip, t), mixView(layout.closeUp, layout.wide, t), layout);
    }
    if (v < T.expand[0]) {
      const t = collapsing;
      return throughWindow(mixRect(strip, second, t), mixView(layout.wide, layout.closeUp, t), layout);
    }
    const t = expanding;
    return throughWindow(mixRect(second, full, t), mixView(layout.closeUp, layout.full, t), layout);
  });
  const plantTransform = useTransform(plant, (v) => v.transform);
  const plantClip = useTransform(plant, (v) => v.clipPath);

  const shade = useEase(p, T.shade);
  const headline = useEase(p, T.headline);
  const headlineY = useTransform(headline, [0, 1], [16, 0]);
  // Once the square covers the screen, nothing under it is needed.
  const under = useTransform(p, (v) => (v < T.covered ? "visible" : "hidden"));

  const side = Math.max(width, height) + 4;
  const squareScale = useTransform(p, [...T.square], [0, 42 / side, 1]);
  const squareVisibility = useTransform(p, (v) =>
    v > T.square[0] && v < T.covered ? "visible" : "hidden",
  );

  const paper = useTransform(useEase(p, T.reveal), (t) => 1 - t);

  const markHeight = Math.min(150, width * 0.3);
  const markWidth = (markHeight * 62) / 65;
  const markY = centre.y - markHeight * 0.13;
  const markIn = useEase(p, T.markIn);
  const land = useEase(p, T.land);
  const markTransform = useTransform(() => {
    const t = target ? land.get() : 0;
    const x = mix(centre.x, target ? target.x + target.w / 2 : centre.x, t);
    const y = mix(markY, target ? target.y + target.h / 2 : markY, t);
    const scale = mix(mix(0.92, 1, markIn.get()), target ? target.h / markHeight : 1, t);
    return `translate(${x - centre.x}px, ${y - markY}px) scale(${scale})`;
  });
  const captionOpacity = useTransform(() => markIn.get() * 0.6 * (1 - land.get()));

  return (
    <>
      {/* The ground. Covered by the photo, then it carries the mark, then it gives way to the page. */}
      <motion.div className="fixed inset-0 bg-brand-paper" style={{ opacity: paper }} />

      <motion.div className="absolute inset-0" style={{ visibility: under }}>
        <Line text={LINE_1} x={x1} width={width1} opacity={opacity1} layout={layout} />
        <Line text={LINE_2} x={x2} width={width2} opacity={opacity2} layout={layout} />
        <motion.div
          className="absolute left-0 w-1"
          style={{
            top: centre.y - (font * CARET) / 2,
            height: font * CARET,
            x: caretX,
            opacity: caretOpacity,
          }}
        >
          {/* It blinks while waiting for the first scroll, and is solid from then on. */}
          <div className={`size-full bg-brand-redline ${idle ? "intro-blink" : ""}`} />
        </motion.div>

        <SidePhoto src="/intro/engineers-5324968.jpg" direction={-1} p={p} layout={layout} />
        <SidePhoto src="/intro/site-crew-8961259.jpg" direction={1} p={p} layout={layout} />

        <motion.div
          className="absolute inset-0 origin-top-left overflow-hidden"
          style={{ transform: plantTransform, clipPath: plantClip }}
        >
          <Image
            src="/intro/plant-refinery-9252122.jpg"
            alt=""
            width={2400}
            height={1200}
            sizes={`${Math.ceil(fit.w)}px`}
            preload
            className="absolute max-w-none"
            style={{ left: fit.x, top: fit.y, width: fit.w, height: fit.h }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-linear-to-r from-brand-ink/75 via-brand-ink/15 via-60% to-brand-ink/5"
          style={{ opacity: shade }}
        />
        <motion.p
          className="absolute leading-[1.1] font-medium tracking-[-0.01em] text-brand-paper"
          style={{
            left: Math.min(96, Math.max(24, width * 0.06)),
            // Never so low that it meets the progress bar and Skip button.
            bottom: width < 640 ? 140 : Math.min(172, Math.max(120, height * 0.19)),
            fontSize: Math.min(40, Math.max(28, width * 0.025)),
            opacity: headline,
            y: headlineY,
          }}
        >
          Owner’s engineering
          <br />
          for gas-fired power.
        </motion.p>
        <Linework p={p} fit={fit} />
        <motion.div
          className="absolute bg-brand-paper"
          style={{
            left: centre.x - side / 2,
            top: centre.y - side / 2,
            width: side,
            height: side,
            scale: squareScale,
            visibility: squareVisibility,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          left: centre.x - markWidth / 2,
          top: markY - markHeight / 2,
          width: markWidth,
          height: markHeight,
          opacity: markIn,
          transform: markTransform,
        }}
      >
        <Image src="/brand/candid-mark.svg" alt="" width={62} height={65} unoptimized loading="eager" className="size-full" />
      </motion.div>
      <motion.p
        className="absolute inset-x-0 text-center text-lg leading-none text-ui-text"
        style={{ top: markY + markHeight / 2 + 28, opacity: captionOpacity }}
      >
        Brand system
      </motion.p>
    </>
  );
}
