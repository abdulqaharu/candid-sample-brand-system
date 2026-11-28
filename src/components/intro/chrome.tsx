"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { Layout } from "./layout";
import { T } from "./timeline";
import { useEase } from "./use-ease";
import { useIdle } from "./use-idle";

/**
 * How far something at a distance from the screen's centre is sitting on the
 * photo: 0 on Paper, 1 on the photo. The growing square takes it back to Paper.
 */
function useOnPhoto(p: MotionValue<number>, layout: Layout, reach: number) {
  const photo = useEase(p, T.expand);
  const side = Math.max(layout.width, layout.height) + 4;
  const square = useTransform(p, [...T.square], [0, 42 / side, 1]);
  return useTransform(() => {
    const shown = photo.get();
    const half = (square.get() * side) / 2;
    return p.get() >= T.covered || half >= reach ? 0 : shown;
  });
}

/** The Skip button. It comes first, so it is the first stop for the keyboard. */
export function SkipButton({ p, layout, onSkip }: { p: MotionValue<number>; layout: Layout; onSkip: () => void }) {
  const dark = useOnPhoto(p, layout, layout.height / 2 - 47);
  const light = useTransform(dark, (v) => 1 - v);
  const opacity = useTransform(p, [...T.chromeOut], [1, 0]);

  return (
    <motion.button
      type="button"
      onClick={onSkip}
      className="absolute inset-x-0 bottom-7.5 z-10 mx-auto h-8.5 w-24 cursor-pointer rounded-full text-sm leading-none font-medium whitespace-pre"
      style={{ opacity }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-ui-text/30 bg-brand-paper"
        style={{ opacity: light }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-brand-paper/30 bg-brand-ink/35"
        style={{ opacity: dark }}
      />
      <motion.span className="absolute inset-0 flex items-center justify-center text-ui-text" style={{ opacity: light }}>
        Skip intro
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center text-brand-paper"
        style={{ opacity: dark }}
      >
        Skip intro
      </motion.span>
    </motion.button>
  );
}

/**
 * The progress bar. Before the first scroll its place is taken by the invitation
 * to scroll: a bobbing mouse above the word. Both sit above the Skip button.
 */
export function Progress({ p, layout }: { p: MotionValue<number>; layout: Layout }) {
  const dark = useOnPhoto(p, layout, layout.height / 2 - 85);
  const light = useTransform(dark, (v) => 1 - v);
  const opacity = useTransform(p, [...T.chromeOut], [1, 0]);
  const idle = useIdle(p);

  return (
    <motion.div className="absolute inset-x-0 bottom-21" style={{ opacity }}>
      <div
        className={`relative mx-auto h-0.5 w-60 transition-opacity duration-200 ${idle ? "opacity-0" : "opacity-100"}`}
      >
        {[
          { shown: light, track: "bg-ui-text/18", fill: "bg-ui-text/80" },
          { shown: dark, track: "bg-brand-paper/18", fill: "bg-brand-paper/80" },
        ].map((ink) => (
          <motion.div key={ink.fill} className="absolute inset-0" style={{ opacity: ink.shown }}>
            <div className={`absolute inset-0 rounded-full ${ink.track}`} />
            <motion.div className={`absolute inset-0 origin-left rounded-full ${ink.fill}`} style={{ scaleX: p }} />
          </motion.div>
        ))}
      </div>
      <div
        className={`absolute inset-x-0 -bottom-1 flex flex-col items-center gap-1.5 transition-opacity duration-200 ${idle ? "opacity-100" : "opacity-0"}`}
      >
        <span className={`flex size-4.75 items-center justify-center opacity-60 ${idle ? "intro-bob" : ""}`}>
          <Image src="/intro/mouse.svg" alt="" width={13} height={17} unoptimized loading="eager" />
        </span>
        <p className="text-[13px] leading-[1.1] text-ui-text/55">Scroll</p>
      </div>
    </motion.div>
  );
}
