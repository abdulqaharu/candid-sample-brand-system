"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { INTRO_CLASS, INTRO_DONE } from "@/lib/intro-script";
import { signature } from "./signature";

const WELCOME_KEY = "candid-welcome-seen";
/** After the Introduction has settled. */
const DELAY = 300;
const lift = [0.32, 0.72, 0, 1] as const;

/** Remembers the modal for this visit, for when storage cannot be used. */
let seenThisVisit = false;

function wanted() {
  if (new URLSearchParams(window.location.search).get("welcome") === "1") return true;
  if (seenThisVisit) return false;
  try {
    return !localStorage.getItem(WELCOME_KEY);
  } catch {
    return true;
  }
}

const cards = [
  { href: "/color", label: "Color", art: <Image src="/welcome/color-folder.svg" alt="" width={108} height={108} unoptimized /> },
  { href: "/typography", label: "Typography", art: <span className="text-[44px] tracking-[-0.04em]">Aa</span> },
  { href: "/motion", label: "Motion", art: <Image src="/welcome/file.svg" alt="" width={30} height={30} unoptimized /> },
];

function Panel({ state, onClose }: { state: "open" | "closing"; onClose: (toPage: boolean) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const primary = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const closing = state === "closing";

  useEffect(() => {
    const element = dialog.current;
    if (!element || element.open) return;
    element.showModal();
    // Without scrolling: on a small screen the panel should open at its top.
    primary.current?.focus({ preventScroll: true });
  }, []);

  // The page holds still underneath.
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      root.style.overflow = "";
      lenis?.start();
    };
  }, [lenis]);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose(true);
      return;
    }
    if (event.key !== "Tab") return;
    // Tab goes round inside the panel.
    const stops = [...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button")];
    const first = stops[0];
    const last = stops[stops.length - 1];
    const here = document.activeElement;
    if (event.shiftKey ? here === first : here === last) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  };

  return (
    <dialog
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onKeyDown={onKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        onClose(true);
      }}
      className="fixed inset-0 m-0 flex size-full max-h-none max-w-none items-end justify-center bg-transparent p-0 backdrop:bg-transparent min-[600px]:items-center min-[600px]:p-6"
    >
      <motion.div
        data-welcome-backdrop
        aria-hidden="true"
        onClick={() => onClose(true)}
        className="absolute inset-0 bg-ui-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 0.55 }}
        transition={{ duration: closing ? 0.2 : 0.24, ease: "linear" }}
      />
      <motion.div
        data-welcome-panel
        data-lenis-prevent
        className="scrollbar-hover relative max-h-[85dvh] w-full overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-xl border border-brand-ink-700 bg-brand-ink-800 min-[600px]:max-h-full min-[600px]:max-w-142 min-[600px]:rounded-xl"
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={closing ? { opacity: 0, y: reduced ? 0 : 8 } : { opacity: 1, y: 0 }}
        transition={closing ? { duration: 0.2, ease: lift } : { duration: 0.4, ease: lift }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => onClose(true)}
          className="absolute top-2.5 right-2.5 flex size-10 cursor-pointer items-center justify-center rounded-md focus-visible:outline-brand-draft-300"
        >
          <Image src="/welcome/close.svg" alt="" width={24} height={24} unoptimized />
        </button>

        <ul className="scrollbar-none flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto overscroll-x-contain px-6 pt-15 min-[600px]:scroll-px-12 min-[600px]:px-12">
          {cards.map((card) => (
            <li key={card.href} className="shrink-0 snap-start">
              <Link
                href={card.href}
                aria-label={card.label}
                onClick={() => onClose(false)}
                className="flex h-37.5 w-50 items-center justify-center rounded-[10px] bg-ui-panel-2 text-ui-text focus-visible:-outline-offset-4"
              >
                {card.art}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-6 pt-11 pb-8 min-[600px]:px-12 min-[600px]:pb-12">
          <h2 id="welcome-title" className="text-2xl leading-[1.25] font-medium tracking-[-0.02em] text-brand-paper">
            Hi Talha, welcome to Candid Intelligence
            <br className="max-[599px]:hidden" /> brand system
          </h2>
          <div className="max-w-103 pt-6 text-sm leading-[1.7] text-brand-ink-300">
            <p>
              A brand system is one shared set of rules and ready-made parts for how Candid Intelligence looks and sounds: the
              colours, the type, the drawings, the photos and the templates for decks, pages and posts.
            </p>
            <p className="pt-[1.7em]">
              With it, your team, a contractor or an AI tool can make something new that looks like Candid Intelligence straight
              away, without starting from scratch or waiting on a designer. When something changes, you update it once
              and it carries everywhere.
            </p>
            <p className="pt-[1.7em]">
              This is a sample I put together from our call and from candid.engineering, so nothing here is final.
              Have a look through the sections on the left and tell me what feels right and what doesn’t.
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 pt-[1.5em]">
            <div>
              <p className="text-sm leading-[1.7] font-medium text-brand-ink-300">Abdulqahar Usman</p>
              <div
                className="mt-2 text-brand-paper-100 [&>svg]:block [&>svg]:h-10.5 [&>svg]:w-auto"
                dangerouslySetInnerHTML={{ __html: signature }}
              />
            </div>
            <button
              ref={primary}
              type="button"
              onClick={() => onClose(true)}
              className="ml-auto h-10 cursor-pointer rounded-xs bg-brand-paper px-5 text-sm font-medium whitespace-pre text-ui-text focus-visible:outline-brand-draft-300"
            >
              Take a look →
            </button>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
}

/**
 * Greets a first-time visitor on the Introduction, after the intro if it plays.
 * It is remembered once closed. ?welcome=1 shows it again.
 */
export function Welcome() {
  const pathname = usePathname();
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  const timer = useRef<number>(undefined);

  useEffect(() => {
    if (pathname !== "/" || !wanted()) return;
    let wait: number | undefined;
    const open = () => {
      wait = window.setTimeout(() => setState("open"), DELAY);
    };
    if (document.documentElement.classList.contains(INTRO_CLASS)) {
      window.addEventListener(INTRO_DONE, open, { once: true });
    } else {
      open();
    }
    return () => {
      window.clearTimeout(wait);
      window.removeEventListener(INTRO_DONE, open);
    };
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const close = useCallback((toPage: boolean) => {
    seenThisVisit = true;
    try {
      localStorage.setItem(WELCOME_KEY, "1");
    } catch {
      // Remembered for this visit only.
    }
    setState("closing");
    // Long enough for the panel to fade and drop.
    timer.current = window.setTimeout(() => {
      setState("closed");
      if (!toPage) return;
      // The dialog has gone by the next frame, so focus can land on the page.
      requestAnimationFrame(() => {
        const links = document.querySelectorAll<HTMLElement>("#app a[href]");
        [...links].find((link) => link.getClientRects().length > 0)?.focus({ preventScroll: true });
      });
    }, 200);
  }, []);

  return state === "closed" ? null : <Panel state={state} onClose={close} />;
}
