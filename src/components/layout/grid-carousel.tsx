"use client";

import { useState, type ReactNode } from "react";
import { ScaledCanvas } from "@/components/drawings/scaled-canvas";

/** One page of a format, placed on the 844 x 548 slide. */
function Page({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: ReactNode;
}) {
  return (
    <div
      className="absolute overflow-hidden bg-ui-white shadow-[0_0_0_0.7px_rgb(17_17_20/0.06)]"
      style={{ left: x, top: y, width: w, height: h }}
    >
      {children}
    </div>
  );
}

const single = { x: 249.6, y: 33.3, w: 337.2, h: 476.5 };

function Caption({ x, y, name, size, margin }: { x: number; y: number; name: string; size: string; margin: string }) {
  return (
    <p className="absolute text-[12.5px] leading-[1.3] tracking-[-0.01em] text-ui-muted" style={{ left: x, top: y }}>
      <span className="text-ui-text">{name} </span>
      {size}
      <br />
      {margin}
    </p>
  );
}

function Logo() {
  return <div className="absolute top-[427.8px] left-[122.6px] h-[28.6px] w-23 bg-ui-block" />;
}

const slides: { label: string; art: ReactNode }[] = [
  {
    label: "An A4 page with a 13 mm margin on each side.",
    art: (
      <Page {...single}>
        <p className="absolute top-1 w-full text-center text-[9px] tracking-[-0.01em] text-ui-muted">13 mm</p>
        <p className="absolute top-1/2 left-1 -translate-y-1/2 rotate-180 text-[9px] tracking-[-0.01em] text-ui-muted [writing-mode:vertical-rl]">
          13 mm
        </p>
      </Page>
    ),
  },
  {
    label: "Three formats: A4 with a 13 mm margin, square and 16:9 with 65 px margins.",
    art: (
      <>
        <Page x={118.7} y={33.2} w={315.6} h={445.9} />
        <Caption x={118.7} y={487.5} name="A4" size="210 × 297 mm" margin="Margin 13 mm" />
        <Page x={470.5} y={33.2} w={247.3} h={247.3} />
        <Caption x={470.5} y={288.9} name="1×1" size="1080 × 1080 px" margin="Margin 65 px" />
        <Page x={470.5} y={339.7} w={247.3} h={139.3} />
        <Caption x={470.5} y={487.5} name="16:9" size="1920 × 1080 px" margin="Margin 65 px" />
      </>
    ),
  },
  {
    label: "The logo placed at the bottom center of the page.",
    art: (
      <Page {...single}>
        <Logo />
      </Page>
    ),
  },
  {
    label: "A headline and short line of text set at the top left of the page.",
    art: (
      <Page {...single}>
        <div className="absolute top-5 left-5">
          <p className="text-[64.4px] leading-[0.92] font-medium tracking-[-0.03em]">
            Concept
            <br />
            to FID.
          </p>
          <p className="w-36 pt-5 text-[12.5px] leading-[1.3] tracking-[-0.01em]">
            PE-stamped packages for gas-fired power.
          </p>
        </div>
      </Page>
    ),
  },
  {
    label: "A drawing area across the top, then a headline and the logo.",
    art: (
      <Page {...single}>
        <div className="absolute inset-x-0 top-0 h-[238px] bg-ui-block" />
        <p className="absolute top-[258.6px] left-5 text-[42.2px] leading-[0.92] font-medium tracking-[-0.03em]">
          Concept
          <br />
          to FID.
        </p>
        <Logo />
      </Page>
    ),
  },
];

export function GridCarousel() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid gap-x-8 gap-y-4 lg:grid-cols-[27fr_70.3fr]">
      <div className={`pt-1 ${index === 0 ? "" : "max-lg:hidden lg:invisible"}`}>
        <h3 className="text-[17px] leading-[1.2] font-medium tracking-[-0.025em]">Setup</h3>
        <p className="max-w-[330px] pt-2 text-[15px] leading-[1.42] tracking-[-0.01em] text-ui-text-2">
          Our margin is 6% of the shortest side of the format: 13 mm on an A4 page. Inside it are six
          columns, with gutters half the size of the margin.
        </p>
      </div>
      <div className="min-w-0">
        <div
          aria-roledescription="carousel"
          aria-label="Grid examples"
          className="overflow-hidden rounded-lg bg-ui-panel"
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={slide.label} aria-hidden={i !== index} className="w-full shrink-0">
                <ScaledCanvas width={843.6} height={548} label={slide.label}>
                  {slide.art}
                </ScaledCanvas>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 pt-3">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Go to ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="size-7 cursor-pointer rounded-full bg-ui-panel text-xs tracking-[-0.01em] text-ui-text-2 aria-[current=true]:bg-ui-text aria-[current=true]:text-ui-white"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
