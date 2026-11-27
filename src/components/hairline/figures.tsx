import { HairlineFigure } from "./hairline-figure";

const names = ["turbine", "substation", "plant"] as const;

const rules = [
  {
    title: "Rounded solids",
    text: "Equipment as simple rounded boxes and cylinders, seen from one fixed angle. No shading, no perspective.",
  },
  {
    title: "Outline, not render",
    text: "Thin lines on plates filled with the page colour. Light figures on light pages, dark on dark.",
  },
  {
    title: "One bright edge",
    text: "A single part gets the bright line. Everything else stays quiet. No colour, no glow.",
  },
  {
    title: "No words inside",
    text: "The figure carries no labels. Names go in the caption or the corner read-out.",
  },
];

/** The corner marks that frame each figure. */
function Marks({ size }: { size: string }) {
  const mark = `pointer-events-none absolute border-(--hairline-hi) ${size}`;
  return (
    <span aria-hidden="true">
      <span className={`${mark} top-0 left-0 border-t border-l`} />
      <span className={`${mark} top-0 right-0 border-t border-r`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span className={`${mark} right-0 bottom-0 border-r border-b`} />
    </span>
  );
}

export function Figures() {
  return (
    <>
      <ul className="grid gap-6 md:grid-cols-3">
        {names.map((name) => (
          <li key={name} className="relative">
            <HairlineFigure name={name} />
            {/* The marks frame the drawing, not the read-out under it. */}
            <span className="pointer-events-none absolute inset-x-0 top-0 aspect-[5/4]">
              <Marks size={name === "substation" ? "size-3.25" : "size-1.5"} />
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-19 grid gap-4.5 md:ml-[50%] md:pl-3">
        {rules.map((rule) => (
          <div key={rule.title}>
            <dt className="text-lg leading-[1.3] font-medium tracking-[-0.015em]">{rule.title}</dt>
            <dd className="max-w-[580px] pt-1 text-[15px] leading-[1.35] tracking-[-0.01em] text-ui-text-2">
              {rule.text}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
