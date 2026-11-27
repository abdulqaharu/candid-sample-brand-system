import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { Palette } from "@/components/color/palette";

export const metadata: Metadata = { title: "Color" };

const restColors = [
  ["bg-brand-redline", "bg-brand-paper-200", "bg-brand-draft-300"],
  ["bg-brand-redline-600", "bg-brand-draft-600", "bg-brand-stamp-600"],
  ["bg-brand-ink-500"],
];

const proportions = [
  { label: "Paper", value: "44%", grow: "grow-[523]" },
  { label: "Ink", value: "31%", grow: "grow-[368]" },
  { label: "The rest · 7 colors", value: "25%", grow: "grow-[297]" },
];

const combinations = [
  { label: "Paper on Ink", back: "bg-brand-ink", dot: "bg-brand-paper" },
  { label: "Ink on Paper", back: "bg-brand-paper", dot: "bg-brand-ink" },
  { label: "Ink on Paper 200", back: "bg-brand-paper-200", dot: "bg-brand-ink" },
  { label: "Ink on Draft light", back: "bg-brand-draft-300", dot: "bg-brand-ink" },
];

const block = "rounded-lg ring-1 ring-ui-rule ring-inset";

export default function ColorPage() {
  return (
    <Shell pathname="/color" title="Color">
      <Section
        id="palette"
        title="Palette"
        first
        description="Candid is light by default: warm Paper whites, near-black Ink and one sharp accent. Redline is the color engineers use to mark what changed on a drawing, so we use it the same way: sparingly, to point at what matters. Draft blue is for drawings, charts and data, and Stamp green marks work that is verified."
      >
        <Palette />
      </Section>

      <Section
        id="proportion"
        title="Proportion"
        description="The bars below show how much of each color to use. Mostly Paper, then Ink, with accents kept rare so they carry meaning."
      >
        <div
          role="img"
          aria-label="Color proportion: Paper 44%, Ink 31%, the other seven colors 25%."
          className="flex h-60 gap-1.5 md:h-110"
        >
          <div className={`basis-0 border border-brand-paper-200 bg-brand-paper grow-[523] ${block}`} />
          <div className={`basis-0 bg-brand-ink grow-[368] ${block}`} />
          <div className="flex basis-0 flex-col overflow-hidden rounded-lg grow-[297]">
            {restColors.map((row) => (
              <div key={row[0]} className="flex flex-1">
                {row.map((color) => (
                  <div key={color} className={`flex-1 ${color}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <dl aria-hidden className="flex gap-1.5 pt-4">
          {proportions.map((item) => (
            <div key={item.label} className={`min-w-0 basis-0 ${item.grow}`}>
              <dt className="truncate text-[12.5px] tracking-[-0.01em] text-ui-muted">{item.label}</dt>
              <dd className="pt-1.5 text-[26px] leading-none font-medium tracking-[-0.035em]">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="combinations"
        title="Combinations"
        description="Accent colors are never paired with each other. Pair each one with Ink or Paper, as shown below, so text always stays readable."
      >
        <ul className="grid grid-cols-2 gap-x-1.5 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
          {combinations.map((item) => (
            <li key={item.label}>
              <div className={`flex aspect-square items-center justify-center ${block} ${item.back}`}>
                <div className={`aspect-square w-[48%] rounded-full ${item.dot}`} />
              </div>
              <p className="pt-1.5 text-xs tracking-[-0.01em] text-ui-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="color-modes"
        title="Color modes"
        description="Use HEX and RGB values on screens, and CMYK for print. One set of colors works in two modes: Light by default, Dark for presentations and events."
        aside={
          // TODO: the Figma table has headers but no rows. Add them when the design provides them.
          <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-6 pt-10 pb-3 text-[15px] font-semibold tracking-[-0.02em]">
            <p>Color mode</p>
            <p>Application</p>
            <p>Notes</p>
          </div>
        }
      />
    </Shell>
  );
}
