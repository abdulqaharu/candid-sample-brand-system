"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { loadFigure } from "./load";
import { figures, type FigureName } from "./rest-poses";

/**
 * One live Hairline figure with its read-out. Until the scripts arrive, and for
 * reduced motion or no JavaScript, it shows the rest pose as it was drawn.
 */
export function HairlineFigure({ name }: { name: FigureName }) {
  const stage = useRef<HTMLDivElement>(null);
  const still = useRef<SVGSVGElement>(null);
  const [read, setRead] = useState("rest");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let stop: (() => void) | undefined;
    let gone = false;

    loadFigure(name)
      .then((figure) => {
        const host = stage.current;
        const kernel = window.HL;
        if (gone || !host || !kernel) return;
        kernel.inject(document);
        const svg = kernel.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, host);
        const readOut = {
          text: "rest" as string | null,
          get textContent() {
            return this.text;
          },
          set textContent(value: string | null) {
            this.text = value;
            setRead(value ?? "");
          },
        };
        const handle = figure.mount({ stage: host, svg, read: readOut }, figure.range[1]);
        const fallback = still.current;
        if (fallback) fallback.style.display = "none";
        stop = () => {
          handle.destroy();
          svg.remove();
          if (fallback) fallback.style.display = "";
          setRead("rest");
        };
      })
      // The still drawing stays if the scripts cannot be loaded.
      .catch((error: unknown) => console.error(error));

    return () => {
      gone = true;
      stop?.();
    };
  }, [name, reducedMotion]);

  return (
    <figure>
      <div ref={stage} data-hairline={name} role="img" aria-label={figures[name].label} className="hairline-stage">
        <svg
          ref={still}
          viewBox="0 0 400 320"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: figures[name].rest }}
        />
      </div>
      <figcaption className="pt-3 text-[13px] text-ui-muted tabular-nums">
        <output aria-live="off">{read}</output>
      </figcaption>
    </figure>
  );
}
