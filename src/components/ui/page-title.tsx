"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Fragment, useLayoutEffect } from "react";

const variants = {
  hidden: { y: "100%", opacity: 0 },
  shown: (line: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1, delay: 0.1 + line * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/**
 * The page's h1. Each line rises out from behind its own baseline, on first load
 * and again when a page kept from earlier navigation is shown.
 */
export function PageTitle({ lines, className }: { lines: string[]; className: string }) {
  const controls = useAnimationControls();

  // Layout effects run again when a hidden page returns, before it is painted.
  useLayoutEffect(() => {
    controls.set("hidden");
    controls.start("shown");
    return () => controls.stop();
  }, [controls]);

  return (
    <h1 className={className}>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && " "}
          {/* The padding keeps descenders and the last letter inside the mask. */}
          <span className="-mb-[0.16em] block overflow-hidden pr-[0.1em] pb-[0.16em]">
            <motion.span
              data-reveal
              className="block"
              custom={index}
              variants={variants}
              initial="hidden"
              animate={controls}
            >
              {line}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </h1>
  );
}
