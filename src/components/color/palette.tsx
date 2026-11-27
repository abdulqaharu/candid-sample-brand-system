"use client";

import { useState } from "react";
import { palette, formatColor, type ColorFormat, type PaletteColor } from "@/lib/tokens";

const formats: ColorFormat[] = ["HEX", "RGB", "CMYK"];

/** Columns of swatches. The number is each swatch's share of its column. */
const columns: { grow: string; items: [PaletteColor, string][] }[] = [
  { grow: "lg:grow-[365]", items: [[palette.redline, "grow"]] },
  {
    grow: "lg:grow-[270]",
    items: [
      [palette.ink, "grow"],
      [palette.draft, "grow"],
      [palette.draftLight, "grow"],
    ],
  },
  {
    grow: "lg:grow-[270]",
    items: [
      [palette.paper, "grow-[2]"],
      [palette.redlineDark, "grow"],
      [palette.stamp, "grow"],
    ],
  },
  {
    grow: "lg:grow-[270]",
    items: [
      [palette.ink500, "grow"],
      [palette.paper200, "grow"],
    ],
  },
];

export function Palette() {
  const [format, setFormat] = useState<ColorFormat>("HEX");
  const [copied, setCopied] = useState<string>();

  const copy = async (color: PaletteColor) => {
    try {
      await navigator.clipboard.writeText(formatColor(color.hex, format));
      setCopied(color.name);
      setTimeout(() => setCopied(undefined), 1500);
    } catch {
      // Clipboard access was refused. The value stays visible on the swatch.
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <fieldset className="flex rounded-full bg-ui-panel p-0.75">
          <legend className="sr-only">Color value format</legend>
          {formats.map((option) => (
            <label
              key={option}
              className="cursor-pointer rounded-full px-3 py-1 text-xs tracking-[-0.01em] text-ui-text-2 has-checked:bg-ui-white has-checked:text-ui-text has-checked:shadow-sm has-focus-visible:outline-2 has-focus-visible:outline-brand-draft-600"
            >
              <input
                type="radio"
                name="color-format"
                className="sr-only"
                checked={format === option}
                onChange={() => setFormat(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="flex flex-col gap-2 pt-3 sm:grid sm:grid-cols-2 lg:flex lg:h-113 lg:flex-row">
        {columns.map((column, index) => (
          <div key={index} className={`flex min-w-0 flex-col gap-2 lg:basis-0 ${column.grow}`}>
            {column.items.map(([color, grow]) => (
              <button
                key={color.name}
                type="button"
                onClick={() => copy(color)}
                aria-label={`Copy ${color.name}, ${format} ${formatColor(color.hex, format)}`}
                className={`flex min-h-18 basis-0 cursor-pointer flex-col justify-between gap-4 rounded-lg p-4 text-left text-[13px] leading-none tracking-[-0.01em] ring-1 ring-ui-rule ring-inset ${grow} ${color.className}`}
              >
                <span className="font-medium">{color.name}</span>
                <span className="opacity-60">
                  {copied === color.name ? "Copied" : formatColor(color.hex, format)}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <p role="status" className="sr-only">
        {copied ? `${copied} copied` : ""}
      </p>
    </div>
  );
}
