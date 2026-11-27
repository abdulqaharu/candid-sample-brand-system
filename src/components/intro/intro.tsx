"use client";

import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { INTRO_CLASS, INTRO_DONE, INTRO_KEY } from "@/lib/intro-script";
import { Progress, SkipButton } from "./chrome";
import { layoutFor, type Layout } from "./layout";
import { LABEL } from "./linework-geometry";
import { LINE_1, LINE_2, Stage, type Metrics, type Target } from "./stage";
import { T } from "./timeline";

const BARE = "candid-intro-bare";

type Setting = { layout: Layout; metrics: Metrics; target: Target };

/** The width the page's scrollbar takes. Zero where scrollbars float over the page. */
function scrollbarWidth() {
  const probe = document.createElement("div");
  probe.className = "scrollbar-hover invisible absolute w-25 overflow-y-scroll";
  document.body.appendChild(probe);
  const width = probe.offsetWidth - probe.clientWidth;
  probe.remove();
  return width;
}

/** The logo the mark lands on: whichever of the shell's logos is on screen. */
function findTarget(): Target {
  for (const logo of document.querySelectorAll<HTMLElement>("[data-brand-mark]")) {
    const box = logo.getBoundingClientRect();
    if (box.width > 0 && box.height > 0) return { x: box.x, y: box.y, w: box.width, h: box.height };
  }
  return null;
}

/** Measures the stage and the set type, again whenever the stage changes size. */
function useSetting(stage: RefObject<HTMLDivElement | null>, ruler: RefObject<HTMLDivElement | null>) {
  const [setting, setSetting] = useState<Setting>();

  useLayoutEffect(() => {
    const element = stage.current;
    const measure = ruler.current;
    if (!element || !measure) return;
    let live = true;
    const update = () => {
      const { clientWidth: width, clientHeight: height } = element;
      if (!live || !width || !height) return;
      const [probe, label] = measure.children as unknown as HTMLElement[];
      probe.textContent = LABEL;
      probe.style.fontSize = "100px";
      probe.className = "inline-block leading-none whitespace-pre";
      const labelWidthPerPx = probe.offsetWidth / 100;
      const draft = layoutFor(width, height, labelWidthPerPx);
      label.style.fontSize = `${draft.font}px`;
      const widths = (line: string) =>
        Array.from({ length: line.length + 1 }, (_, n) => {
          label.textContent = line.slice(0, n);
          return n === 0 ? 0 : label.offsetWidth;
        });
      setSetting({ layout: draft, metrics: { line1: widths(LINE_1), line2: widths(LINE_2) }, target: findTarget() });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    // Measured again once Geist has arrived, in case a fallback was measured first.
    document.fonts.ready.then(update);
    return () => {
      live = false;
      observer.disconnect();
    };
  }, [stage, ruler]);

  return setting;
}

function Frames({
  p,
  still,
  onSkip,
}: {
  p: MotionValue<number>;
  /** Holds one frame, for reduced motion. */
  still?: boolean;
  onSkip: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const ruler = useRef<HTMLDivElement>(null);
  const setting = useSetting(stage, ruler);

  return (
    <div ref={stage} className="sticky top-0 h-dvh w-full overflow-hidden">
      {setting && <SkipButton p={p} layout={setting.layout} onSkip={onSkip} />}
      <div aria-hidden="true">
        {/* Never seen: it sets the type so that its widths can be read. */}
        <div ref={ruler} className="invisible absolute top-0 left-0">
          <span />
          <span className="inline-block leading-none font-medium tracking-[-0.02em] whitespace-pre" />
        </div>
        {setting ? (
          <Stage
            // A new size is a new set of keyframes.
            key={`${setting.layout.width}x${setting.layout.height}`}
            p={p}
            layout={setting.layout}
            metrics={setting.metrics}
            target={still ? null : setting.target}
          />
        ) : (
          <div className="fixed inset-0 bg-brand-paper" />
        )}
        {setting && <Progress p={p} layout={setting.layout} />}
      </div>
    </div>
  );
}

/** The pinned sequence: about five screens of scroll, read as progress from 0 to 1. */
function Sequence({ onDone }: { onDone: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Read through a plain value: handed straight to styles, Motion moves scroll-linked
  // opacity and clip-path onto a native timeline, which does not hold these ranges.
  const p = useTransform(() => scrollYProgress.get());
  useMotionValueEvent(p, "change", (v) => {
    if (v >= T.done) onDone();
  });

  return (
    <div ref={track} className="h-[600dvh]">
      <Frames p={p} onSkip={onDone} />
    </div>
  );
}

/** Reduced motion: the mark on Paper for a moment, then a cross-fade to the page. */
function Still({ onDone }: { onDone: () => void }) {
  const p = useMotionValue(0.93);
  const opacity = useMotionValue(1);

  useEffect(() => {
    const fade = animate(opacity, 0, { delay: 0.6, duration: 0.4, ease: "linear", onComplete: onDone });
    return () => fade.stop();
  }, [opacity, onDone]);

  return (
    <motion.div className="fixed inset-0" style={{ opacity }}>
      <Frames p={p} still onSkip={onDone} />
    </motion.div>
  );
}

const subscribeMotion = (change: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
};
const prefersStill = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The first-visit intro. Whether it plays is decided before first paint by the
 * script in <head>, which puts a class on <html>; this follows that decision.
 */
export function Intro() {
  const [done, setDone] = useState(false);
  const wanted = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.classList.contains(INTRO_CLASS),
    () => false,
  );
  const reduced = useSyncExternalStore(subscribeMotion, prefersStill, () => false);
  const playing = wanted && !done;
  const lenis = useLenis();
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      localStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Without storage the intro is not shown on a later visit either.
    }
    // The page was held at its top under the intro, so nothing moves as this lifts.
    document.documentElement.classList.remove(INTRO_CLASS, BARE);
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    history.scrollRestoration = "auto";
    setDone(true);
    window.dispatchEvent(new Event(INTRO_DONE));
  }, [lenis]);

  // The scrollbar is put away so the frames reach the edge. The page beneath keeps
  // the width the scrollbar will take, so nothing shifts when it comes back.
  useLayoutEffect(() => {
    if (!playing) return;
    const root = document.documentElement;
    root.style.setProperty("--intro-gutter", `${scrollbarWidth()}px`);
    root.classList.add(BARE);
    return () => {
      root.classList.remove(BARE);
      root.style.removeProperty("--intro-gutter");
    };
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const app = document.getElementById("app");
    if (app) app.inert = true;
    window.scrollTo(0, 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      if (app) app.inert = false;
      window.removeEventListener("keydown", onKey);
    };
  }, [playing, finish]);

  if (done) return null;

  return (
    <div className="intro-root relative z-50">
      {playing ? (
        <>
          <p className="sr-only">Concept to FID, in weeks. Owner’s engineering for gas-fired power.</p>
          {reduced ? <Still onDone={finish} /> : <Sequence onDone={finish} />}
        </>
      ) : (
        // Paper until the script on the page has caught up.
        <div className="fixed inset-0 bg-brand-paper" />
      )}
    </div>
  );
}
