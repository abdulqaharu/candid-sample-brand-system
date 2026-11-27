"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Asset } from "@/components/ui/asset";

const ease: [number, number, number, number] = [0.2, 0, 0, 1];

/** Reduced motion swaps every move for an instant change. */
function useTiming(duration: number): Transition {
  return useReducedMotion() ? { duration: 0 } : { duration, ease };
}

function Tile({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <li>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-ui-panel">
        {children}
      </div>
      <p className="pt-3 text-sm leading-[1.45] tracking-[-0.01em]">{title}</p>
      <p className="text-sm leading-[1.45] tracking-[-0.01em] text-ui-text-2">{caption}</p>
    </li>
  );
}

const cover = "absolute inset-0 flex cursor-pointer flex-col items-center justify-center";

function LogoDemo() {
  const [run, setRun] = useState(0);
  const timing = useTiming(0.5);
  return (
    <button type="button" aria-label="Play the logo animation" onClick={() => setRun(run + 1)} className={cover}>
      <motion.span
        key={run}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={timing}
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

function HeadlineDemo() {
  const [run, setRun] = useState(0);
  const timing = useTiming(0.5);
  return (
    <button type="button" aria-label="Play the headline animation" onClick={() => setRun(run + 1)} className={cover}>
      {/* The wrapper watches the view: the lines start clipped, so they cannot trigger themselves. */}
      <motion.span key={run} initial="hidden" whileInView="shown" viewport={{ once: true }} className="block">
        {["Candid", "Brand system"].map((line, i) => (
          <span key={line} className="block overflow-hidden text-3xl leading-[1.1] font-medium tracking-[-0.03em]">
            <motion.span
              className="block pb-0.5"
              variants={{ hidden: { y: "110%" }, shown: { y: 0 } }}
              transition={{ ...timing, delay: timing.duration ? i * 0.08 : 0 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </button>
  );
}

function ButtonDemo() {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      whileTap={reduced ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.15, ease }}
      className="cursor-pointer rounded-full bg-brand-redline px-7 py-3 text-base leading-6 font-medium tracking-[-0.01em] text-ui-white"
    >
      Continue
    </motion.button>
  );
}

function ToggleDemo() {
  const [on, setOn] = useState(false);
  const timing = useTiming(0.15);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Toggle demo"
      onClick={() => setOn(!on)}
      className="relative h-11 w-19.5 cursor-pointer rounded-full bg-ui-track aria-checked:bg-brand-redline"
    >
      <motion.span
        className="absolute top-1.25 left-1.25 size-8.5 rounded-full bg-ui-white shadow-[0_1px_4px_rgb(0_0_0/0.2)]"
        animate={{ x: on ? 34 : 0 }}
        transition={timing}
      />
    </button>
  );
}

const cards = ["bg-brand-redline", "bg-brand-redline-300", "bg-brand-redline-200"];

function CarouselDemo() {
  const [index, setIndex] = useState(0);
  const timing = useTiming(0.5);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-47.5 overflow-hidden pb-8">
        <motion.div className="flex gap-2.5 pl-5.5" animate={{ x: index * -122 }} transition={timing}>
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
            aria-current={index === i}
            onClick={() => setIndex(i)}
            className="h-1.75 w-1.75 cursor-pointer rounded-full bg-ui-text/30 transition-[width] duration-300 aria-[current=true]:w-5 aria-[current=true]:bg-ui-text motion-reduce:transition-none"
          />
        ))}
      </div>
    </div>
  );
}

function MenuDemo() {
  const [open, setOpen] = useState(false);
  const timing = useTiming(0.15);
  return (
    <div className="flex h-46 w-59 flex-col items-start gap-1.5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-1.5 rounded-full bg-ui-white px-4 py-2 text-sm tracking-[-0.01em]"
      >
        Options
        <Asset name="a39a5.svg" width={14} height={14} />
      </button>
      <motion.div
        aria-hidden
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={timing}
        className="flex w-36 flex-col gap-3 rounded-xl bg-ui-white p-4"
      >
        <span className="h-1.5 w-24 rounded-full bg-ui-text/15" />
        <span className="h-1.5 w-16 rounded-full bg-ui-text/15" />
        <span className="h-1.5 w-20 rounded-full bg-ui-text/15" />
      </motion.div>
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(true);
  const timing = useTiming(0.3);
  return (
    <div className="relative flex h-65 w-[78%] items-center justify-center overflow-hidden rounded-xl bg-ui-white">
      <div className="absolute inset-0 bg-brand-ink/18" />
      <button
        type="button"
        aria-label={open ? "Close the demo dialog" : "Open the demo dialog"}
        onClick={() => setOpen(!open)}
        className="absolute inset-0 cursor-pointer"
      />
      <motion.div
        aria-hidden
        initial={false}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={timing}
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

export function MotionDemos() {
  return (
    <ul className="grid gap-x-2 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      <Tile title="Logo" caption="Arriving on screen.">
        <LogoDemo />
      </Tile>
      <Tile title="Headline" caption="Titles rising line by line.">
        <HeadlineDemo />
      </Tile>
      <Tile title="Button" caption="Pressing a button.">
        <ButtonDemo />
      </Tile>
      <Tile title="Toggle" caption="Switching on and off.">
        <ToggleDemo />
      </Tile>
      <Tile title="Carousel" caption="Moving through a set.">
        <CarouselDemo />
      </Tile>
      <Tile title="Menu" caption="Opening a dropdown.">
        <MenuDemo />
      </Tile>
      <Tile title="Modal" caption="Asking for a decision.">
        <ModalDemo />
      </Tile>
    </ul>
  );
}
