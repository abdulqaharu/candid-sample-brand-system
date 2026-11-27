"use client";

import { useState } from "react";

const weightNames: Record<number, string> = { 400: "Regular", 500: "Medium" };

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display?: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="relative flex h-10 flex-1 items-center justify-between overflow-hidden rounded-xl bg-ui-text/4 px-3.5 text-[13px] tracking-[-0.01em] has-focus-visible:outline-2 has-focus-visible:outline-brand-draft-600">
      <span aria-hidden className="absolute inset-y-0 left-0 rounded-xl bg-ui-text/8" style={{ width: `${fill}%` }}>
        <span className="absolute top-2.75 right-2.5 h-4.5 w-0.75 rounded-full bg-ui-text/70" />
      </span>
      <span className="relative">{label}</span>
      <span aria-hidden className="relative flex gap-1.5 pr-3">
        {display && <span className="text-ui-muted">{display}</span>}
        <span className="text-ui-text-2">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </label>
  );
}

export function TypeTester() {
  const [size, setSize] = useState(96);
  const [weight, setWeight] = useState(500);

  return (
    <div className="min-h-120 overflow-hidden rounded-lg bg-ui-panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Slider label="Size" value={size} min={16} max={160} step={1} onChange={setSize} />
        <Slider
          label="Weight"
          value={weight}
          display={weightNames[weight]}
          min={400}
          max={500}
          step={1}
          onChange={setWeight}
        />
      </div>
      <p
        contentEditable="plaintext-only"
        suppressContentEditableWarning
        role="textbox"
        aria-label="Sample text"
        className="rounded-md pt-10 leading-[1.02] tracking-[-0.045em] wrap-break-word"
        style={{ fontSize: `min(${size}px, ${(size / 96) * 14}vw)`, fontWeight: weight }}
      >
        Concept to FID, in weeks.
      </p>
    </div>
  );
}
