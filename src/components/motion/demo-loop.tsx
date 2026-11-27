"use client";

import { useAnimationFrame, useReducedMotion, type Transition } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { isPaused, subscribePaused } from "@/lib/motion-paused";

/** The brand curve. */
const ease: [number, number, number, number] = [0.32, 0.72, 0, 1];

/** All in milliseconds. */
const HOLD_END = 1500;
const HOLD_REST = 1000;
const STAGGER = 400;
const RESUME = 600;
const SNAP = 200;

/** `demo` moves at the demo's own timing, `snap` returns to rest, `none` jumps. */
type Speed = "demo" | "snap" | "none";
type View = { step: number; speed: Speed; paused: boolean };

type Card = {
  element: HTMLElement;
  index: number;
  /** How long the demo's change takes. */
  duration: number;
  show: (view: Partial<View>) => void;
  inView: boolean;
  /** What is holding the card for the visitor. */
  holds: Set<"pointer" | "focus" | "touch">;
  step: number;
  /** When the loop next changes the card; null while it is not looping. */
  due: number | null;
  /** The wait before the loop next starts. */
  wait: number;
  /** The frame a replay is waiting for. */
  frame: number;
};

/** Each card on the page, found by its element. */
const registry = new WeakMap<Element, Card>();

type Clock = { add: (card: Card) => () => void };

const ClockContext = createContext<Clock | null>(null);

const subscribeReduced = (change: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
};

/** Moves one card on, if its time has come. */
function advance(card: Card, now: number, paused: boolean) {
  if (paused || !card.inView || card.holds.size > 0) {
    // Stop where it can start cleanly again: at rest.
    if (card.due !== null) {
      card.due = null;
      card.step = 0;
      card.show({ step: 0, speed: "snap" });
    }
    return;
  }
  if (card.due === null) {
    card.due = now + card.wait;
    // Leaves behind whatever the visitor did with the card.
    card.step = 0;
    card.show({ step: 0, speed: "snap" });
  } else if (now >= card.due) {
    card.step = card.step === 0 ? 1 : 0;
    card.due = now + card.duration + (card.step === 1 ? HOLD_END : HOLD_REST);
    card.show({ step: card.step, speed: "demo" });
  }
}

/**
 * One clock for every demo on the page: it watches which cards are in view and,
 * frame by frame, moves each looping card on when its time comes.
 */
export function DemoClock({ children }: { children: ReactNode }) {
  const cards = useRef(new Set<Card>());
  const observer = useRef<IntersectionObserver>(null);
  const reduced = useReducedMotion();
  const [clock] = useState<Clock>(() => ({
    add: (card) => {
      cards.current.add(card);
      observer.current ??= new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            for (const each of cards.current) {
              if (each.element !== entry.target) continue;
              each.inView = entry.intersectionRatio >= 0.5;
              // Coming back into view, cards start out of step again.
              if (!each.inView) each.wait = each.index * STAGGER;
            }
          }
        },
        { threshold: [0, 0.5] },
      );
      observer.current.observe(card.element);
      return () => {
        cards.current.delete(card);
        observer.current?.unobserve(card.element);
      };
    },
  }));

  useEffect(
    () => () => {
      observer.current?.disconnect();
      observer.current = null;
    },
    [],
  );

  useAnimationFrame((now) => {
    if (reduced) return;
    const paused = isPaused();
    for (const card of cards.current) advance(card, now, paused);
  });

  return <ClockContext value={clock}>{children}</ClockContext>;
}

/**
 * Drives one demo card. While it loops, `step` goes between rest (0) and the end
 * state (1). Hover, keyboard focus or a tap hands the card to the visitor, who
 * then sets the step. Reduced motion shows the end state, with `play` to run it.
 */
export function useDemoLoop(index: number, duration: number) {
  const clock = useContext(ClockContext);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const reduced = useReducedMotion() ?? false;
  const pagePaused = useSyncExternalStore(subscribePaused, isPaused, () => false);
  const stillPreferred = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [view, setView] = useState<View>({ step: 0, speed: "none", paused: false });
  // Reduced motion: the end state until the visitor does something.
  const [stillStep, setStillStep] = useState<{ step: number; speed: Speed }>({ step: 1, speed: "none" });

  useEffect(() => {
    if (!element || !clock) return;
    const entry: Card = {
      element,
      index,
      duration,
      show: (next) => setView((current) => ({ ...current, ...next })),
      inView: false,
      holds: new Set(),
      step: 0,
      due: null,
      wait: index * STAGGER,
      frame: 0,
    };
    registry.set(element, entry);
    const remove = clock.add(entry);

    // A tap anywhere else gives a tapped card back to the loop.
    const outside = (event: globalThis.PointerEvent) => {
      if (!element.contains(event.target as Node)) release("touch");
    };
    const release = (hold: "touch") => {
      if (!entry.holds.delete(hold) || entry.holds.size > 0) return;
      entry.wait = RESUME;
      entry.show({ step: 0, speed: "snap", paused: false });
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      cancelAnimationFrame(entry.frame);
      remove();
      registry.delete(element);
    };
  }, [element, clock, index, duration]);

  const hold = (target: Element, reason: "pointer" | "focus" | "touch") => {
    const entry = registry.get(target);
    if (!entry || stillPreferred) return;
    const first = entry.holds.size === 0;
    entry.holds.add(reason);
    if (!first) return;
    entry.due = null;
    entry.step = 0;
    entry.show({ step: 0, speed: "snap", paused: true });
  };

  const release = (target: Element, reason: "pointer" | "focus") => {
    const entry = registry.get(target);
    if (!entry || !entry.holds.delete(reason) || entry.holds.size > 0) return;
    entry.wait = RESUME;
    entry.show({ step: 0, speed: "snap", paused: false });
  };

  const handlers = {
    onPointerEnter: (event: PointerEvent) =>
      event.pointerType !== "touch" && hold(event.currentTarget, "pointer"),
    onPointerLeave: (event: PointerEvent) =>
      event.pointerType !== "touch" && release(event.currentTarget, "pointer"),
    onPointerDownCapture: (event: PointerEvent) =>
      event.pointerType === "touch" && hold(event.currentTarget, "touch"),
    onFocus: (event: FocusEvent) =>
      event.target.matches(":focus-visible") && hold(event.currentTarget, "focus"),
    onBlur: (event: FocusEvent) =>
      !event.currentTarget.contains(event.relatedTarget) && release(event.currentTarget, "focus"),
  };

  const step = stillPreferred ? stillStep.step : view.step;
  const speed = stillPreferred ? stillStep.speed : view.speed;

  /** What the visitor does with the component. */
  const setStep = (next: number) => {
    if (stillPreferred) setStillStep({ step: next, speed: "none" });
    else setView((current) => ({ ...current, step: next, speed: reduced ? "none" : "demo" }));
  };

  /** Runs the change once, from rest. Call it from anything inside the card. */
  const play = (event: { currentTarget: Element }) => {
    const entry = registry.get(event.currentTarget.closest("[data-demo]")!);
    if (!entry) return;
    const to = (next: { step: number; speed: Speed }) => {
      if (stillPreferred) setStillStep(next);
      else setView((current) => ({ ...current, ...next }));
    };
    to({ step: 0, speed: "none" });
    cancelAnimationFrame(entry.frame);
    // A frame at rest first, so that there is something to move from.
    entry.frame = requestAnimationFrame(() => {
      entry.frame = requestAnimationFrame(() => to({ step: 1, speed: "demo" }));
    });
  };

  const seconds = speed === "demo" ? duration / 1000 : speed === "snap" ? SNAP / 1000 : 0;
  const transition: Transition = { duration: seconds, ease };

  return {
    attach: setElement,
    handlers,
    step,
    setStep,
    play,
    transition,
    still: stillPreferred,
    paused: !stillPreferred && (view.paused || pagePaused),
  };
}

export type Demo = Omit<ReturnType<typeof useDemoLoop>, "attach">;
