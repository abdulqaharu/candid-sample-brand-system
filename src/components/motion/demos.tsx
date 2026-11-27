"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Asset } from "@/components/ui/asset";
import { DemoClock, useDemoLoop, type Demo } from "./demo-loop";

/** One demo's card. The loop drives what is inside until the visitor takes over. */
function Tile({
  index,
  title,
  caption,
  duration,
  component: Component,
}: {
  index: number;
  title: string;
  caption: string;
  /** How long the demo's change takes, in milliseconds. */
  duration: number;
  component: ComponentType<{ demo: Demo }>;
}) {
  const { attach, ...demo } = useDemoLoop(index, duration);
  return (
    <li>
      <div
        ref={attach}
        {...demo.handlers}
        data-demo={title}
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-ui-panel"
      >
        <Component demo={demo} />
        {demo.paused && (
          <p className="pointer-events-none absolute top-3 right-3 z-10 text-xs leading-none text-ui-text/50">
            Paused
          </p>
        )}
        {demo.still && (
          <button
            type="button"
            onClick={demo.play}
            aria-label={`Play ${title.toLowerCase()} demo once`}
            className="absolute right-3 bottom-3 z-10 h-7 cursor-pointer rounded-full bg-ui-text/6 px-3 text-xs text-ui-text hover:bg-ui-text/10"
          >
            Play
          </button>
        )}
      </div>
      <p className="pt-3 text-sm leading-[1.45] tracking-[-0.01em]">{title}</p>
      <p className="text-sm leading-[1.45] tracking-[-0.01em] text-ui-text-2">{caption}</p>
    </li>
  );
}

/** The headline's timing, and how long its second line waits behind the first. */
const HEADLINE = 500;
const LINE_DELAY = 80;

const cover = "absolute inset-0 flex cursor-pointer flex-col items-center justify-center";

function LogoDemo({ demo }: { demo: Demo }) {
  return (
    <button type="button" aria-label="Play the logo animation" onClick={demo.play} className={cover}>
      <motion.span
        initial={false}
        animate={demo.step ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={demo.transition}
        className="relative block h-32 w-30.5 overflow-hidden mix-blend-multiply"
      >
        <Asset
          name="6e1f2.png"
          width={1024}
          height={1024}
          className="absolute top-[-17.8%] left-[-21.21%] h-[140.2%] w-[146.82%] max-w-none"
        />
      </motion.span>
    </button>
  );
}

function HeadlineDemo({ demo }: { demo: Demo }) {
  // The lines follow one another only when the change is being played.
  const stagger = demo.transition.duration === HEADLINE / 1000 ? LINE_DELAY / 1000 : 0;
  return (
    <button type="button" aria-label="Play the headline animation" onClick={demo.play} className={cover}>
      <span className="block">
        {["Candid Intelligence", "Brand system"].map((line, i) => (
          <span key={line} className="block overflow-hidden text-3xl leading-[1.1] font-medium tracking-[-0.03em]">
            <motion.span
              className="block pb-0.5"
              initial={false}
              animate={{ y: demo.step ? "0%" : "110%" }}
              transition={{ ...demo.transition, delay: i * stagger }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </button>
  );
}

function ButtonDemo({ demo }: { demo: Demo }) {
  return (
    <motion.button
      type="button"
      initial={false}
      animate={{ scale: demo.step ? 0.94 : 1 }}
      whileTap={demo.still ? undefined : { scale: 0.94 }}
      transition={demo.transition}
      className="cursor-pointer rounded-full bg-brand-redline px-7 py-3 text-base leading-6 font-medium tracking-[-0.01em] text-ui-white"
    >
      Continue
    </motion.button>
  );
}

function ToggleDemo({ demo }: { demo: Demo }) {
  const on = demo.step === 1;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Toggle demo"
      onClick={() => demo.setStep(on ? 0 : 1)}
      className="relative h-11 w-19.5 cursor-pointer rounded-full bg-ui-track"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-brand-redline"
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={demo.transition}
      />
      <motion.span
        className="absolute top-1.25 left-1.25 size-8.5 rounded-full bg-ui-white shadow-[0_1px_4px_rgb(0_0_0/0.2)]"
        initial={false}
        animate={{ x: on ? 34 : 0 }}
        transition={demo.transition}
      />
    </button>
  );
}

const cards = ["bg-brand-redline", "bg-brand-redline-300", "bg-brand-redline-200"];

function CarouselDemo({ demo }: { demo: Demo }) {
  const index = demo.step;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-47.5 overflow-hidden pb-8">
        <motion.div
          className="flex gap-2.5 pl-5.5"
          initial={false}
          animate={{ x: index * -122 }}
          transition={demo.transition}
        >
          {cards.map((color) => (
            <div key={color} className={`h-35 w-28 shrink-0 overflow-hidden rounded-xl ${color}`}>
              <div className="h-35 bg-brand-paper-200" />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex gap-1.5">
        {cards.map((color, i) => (
          <button
            key={color}
            type="button"
            aria-label={`Show card ${i + 1}`}
            aria-current={index === i ? "true" : undefined}
            onClick={() => demo.setStep(i)}
            className="h-1.75 w-1.75 cursor-pointer rounded-full bg-ui-text/30 aria-current:w-5 aria-current:bg-ui-text"
          />
        ))}
      </div>
    </div>
  );
}

function MenuDemo({ demo }: { demo: Demo }) {
  const open = demo.step === 1;
  return (
    <div className="flex h-46 w-59 flex-col items-start gap-1.5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => demo.setStep(open ? 0 : 1)}
        className="flex cursor-pointer items-center gap-1.5 rounded-full bg-ui-white px-4 py-2 text-sm tracking-[-0.01em]"
      >
        Options
        <Asset name="a39a5.svg" width={14} height={14} />
      </button>
      <motion.div
        aria-hidden
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={demo.transition}
        className="flex w-36 flex-col gap-3 rounded-xl bg-ui-white p-4"
      >
        <span className="h-1.5 w-24 rounded-full bg-ui-text/15" />
        <span className="h-1.5 w-16 rounded-full bg-ui-text/15" />
        <span className="h-1.5 w-20 rounded-full bg-ui-text/15" />
      </motion.div>
    </div>
  );
}

function ModalDemo({ demo }: { demo: Demo }) {
  const open = demo.step === 1;
  return (
    <div className="relative flex h-65 w-[78%] items-center justify-center overflow-hidden rounded-xl bg-ui-white">
      <div className="absolute inset-0 bg-brand-ink/18" />
      <button
        type="button"
        aria-label={open ? "Close the demo dialog" : "Open the demo dialog"}
        onClick={() => demo.setStep(open ? 0 : 1)}
        className="absolute inset-0 cursor-pointer"
      />
      <motion.div
        aria-hidden
        initial={false}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={demo.transition}
        className="pointer-events-none relative w-40 rounded-xl bg-ui-white p-3 shadow-[0_12px_30px_rgb(0_0_0/0.35)]"
      >
        <div className="h-21.5 rounded-lg bg-brand-paper-200" />
        <div className="mt-2.5 h-1.5 w-24 rounded-full bg-ui-text/15" />
        <div className="mt-1.5 h-1.5 w-15.5 rounded-full bg-ui-text/8" />
        <div className="mt-3 h-6 rounded-full bg-brand-redline" />
      </motion.div>
    </div>
  );
}

const demos = [
  { title: "Logo", caption: "Arriving on screen.", duration: 500, component: LogoDemo },
  // The longer of its timings: both lines have landed.
  { title: "Headline", caption: "Titles rising line by line.", duration: HEADLINE, component: HeadlineDemo },
  { title: "Button", caption: "Pressing a button.", duration: 150, component: ButtonDemo },
  { title: "Toggle", caption: "Switching on and off.", duration: 150, component: ToggleDemo },
  { title: "Carousel", caption: "Moving through a set.", duration: 500, component: CarouselDemo },
  { title: "Menu", caption: "Opening a dropdown.", duration: 150, component: MenuDemo },
  { title: "Modal", caption: "Asking for a decision.", duration: 300, component: ModalDemo },
];

export function MotionDemos() {
  return (
    <DemoClock>
      <ul className="grid gap-x-2 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <Tile key={demo.title} index={index} {...demo} />
        ))}
      </ul>
    </DemoClock>
  );
}
