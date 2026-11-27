import type { ReactNode } from "react";
import { Asset } from "@/components/ui/asset";
import { ScaledCanvas } from "./scaled-canvas";
import { Box, Line, Sprite, Text } from "./parts";

const mono = "font-mono font-medium tracking-[0.08em]";

function Art({ tag, label, children }: { tag: string; label: string; children: ReactNode }) {
  return (
    <ScaledCanvas width={392} height={300} label={label}>
      <Box x={0} y={0} w={392} h={300} className="bg-brand-paper-100" />
      {Array.from({ length: 17 }, (_, i) => i * 24).map((x) => (
        <Line key={`v${x}`} src="ba834.svg" box={[x, 0, 0, 300]} length={300} rotate={90} />
      ))}
      {Array.from({ length: 13 }, (_, i) => i * 24).map((y) => (
        <Line key={`h${y}`} src="6eec1.svg" box={[0, y, 392, 0]} />
      ))}
      <p className="absolute top-3.5 left-3.5 rounded-xs bg-brand-ink px-2 py-1.25 text-[10px] leading-[normal] font-medium text-brand-paper">
        {tag}
      </p>
      {children}
    </ScaledCanvas>
  );
}

function Equipment() {
  return (
    <Art
      tag="Illustration · drafting"
      label="Drafting illustration of a 7HA.02 gas turbine, 13.2 metres long."
    >
      <Line src="ebbca.svg" box={[40, 150, 312, 0]} />
      <Box x={130} y={110} w={150} h={80} className="border border-brand-ink" />
      <Box x={280} y={120} w={40} h={60} className="border border-brand-ink" />
      <Line src="fc7a0.svg" box={[90, 95, 40, 15]} length={42.72} rotate={20.56} />
      <Line src="d5eee.svg" box={[90, 190, 40, 15]} length={42.72} rotate={-20.56} />
      <Line src="ca8fa.svg" box={[90, 95, 0, 110]} length={110} rotate={90} />
      {[140, 164, 188, 212, 236, 260].map((x) => (
        <Line key={x} src="43822.svg" box={[x, 110, 20, 80]} length={82.46} rotate={75.96} stroke={0.75} />
      ))}
      <Line src="5500f.svg" box={[90, 232, 230, 0]} />
      {[90, 320].map((x) => (
        <Line key={x} src="33059.svg" box={[x, 226, 0, 12]} length={12} rotate={90} />
      ))}
      <Text x={188} y={214} className={`${mono} text-[10px] text-brand-ink-400`}>
        13.2 M
      </Text>
      <Sprite src="c82ef.svg" x={317} y={107} w={6} />
      <Line src="345ef.svg" box={[320, 85, 25, 25]} length={35.36} rotate={-45} />
      <Line src="433c3.svg" box={[345, 85, 27, 0]} />
      <Text x={348} y={70} className={`${mono} text-[10px] text-brand-draft-600`}>
        GT
      </Text>
      <Text x={40} y={262} className={`${mono} text-[10px] text-brand-ink`}>
        7HA.02  ·  GAS TURBINE
      </Text>
    </Art>
  );
}

const steps = [
  { circle: 46, number: "01", name: "SITE", nameX: 48 },
  { circle: 136.6, number: "02", name: "12 OPTIONS", nameX: 120.1 },
  { circle: 227.2, number: "03", name: "QUOTES", nameX: 223.2 },
  { circle: 317.8, number: "04", name: "STAMPED", nameX: 310.3 },
];

function Process() {
  return (
    <Art
      tag="Illustration · drafting"
      label="Process illustration: site, 12 options, quotes, stamped. Concept to FID in about 4 weeks."
    >
      <Line src="04246.svg" box={[60, 140, 272, 0]} />
      {steps.map((step) => (
        <div key={step.number}>
          <Sprite src="d5599.svg" x={step.circle} y={126} w={28} />
          <Text x={step.circle + 7} y={134} className={`${mono} text-[10px] text-brand-ink`}>
            {step.number}
          </Text>
          <Text
            x={step.nameX}
            y={170}
            className={`${mono} text-[9px] ${step.number === "04" ? "text-brand-stamp-600" : "text-brand-ink"}`}
          >
            {step.name}
          </Text>
        </div>
      ))}
      <Sprite src="bc806.svg" x={312} y={120} w={40} />
      <Text x={60} y={230} className={`${mono} text-[10px] text-brand-ink-400`}>
        CONCEPT TO FID  ·  ~4 WEEKS
      </Text>
    </Art>
  );
}

/** Moves a part of the figure while the pointer is over the tile. */
function Part({ shift, children }: { shift: string; children: ReactNode }) {
  return (
    <div className={`absolute inset-0 transition-transform duration-300 motion-reduce:transition-none ${shift}`}>
      {children}
    </div>
  );
}

function Interactive() {
  return (
    <Art
      tag="Illustration · interactive"
      label="Interactive illustration of a turbine in a browser window. The parts separate on hover."
    >
      <Box x={40} y={60} w={312} h={190} className="border border-brand-ink-300 bg-brand-paper" />
      <Line src="41135.svg" box={[40, 80, 312, 0]} />
      {[49, 59, 69].map((x) => (
        <Sprite key={x} src="4c589.svg" x={x} y={67} w={6} />
      ))}
      <Part shift="motion-safe:group-hover:-translate-x-5">
        <Line src="8c3a5.svg" box={[80, 110, 30, 10]} length={31.62} rotate={18.43} />
        <Line src="b8884.svg" box={[80, 190, 30, 10]} length={31.62} rotate={-18.43} />
        <Line src="b1626.svg" box={[80, 110, 0, 90]} length={90} rotate={90} />
      </Part>
      <Part shift="">
        <Box x={110} y={120} w={120} h={70} className="border border-brand-ink" />
        {[120, 148, 176, 204].map((x) => (
          <Line key={x} src="07ca8.svg" box={[x, 120, 22, 70]} length={73.38} rotate={72.55} stroke={0.75} />
        ))}
      </Part>
      <Part shift="motion-safe:group-hover:translate-x-6">
        <Box x={230} y={135} w={30} h={40} className="border border-brand-ink" />
      </Part>
      <Line src="a619c.svg" box={[150, 212, 100, 0]} />
      <Text x={150} y={220} className={`${mono} text-[9px] text-brand-draft-600`}>
        HOVER TO EXPLODE
      </Text>
      <div className="absolute top-45 left-65.5 h-4.75 w-[12.5px]">
        <div className="absolute inset-[-5.82%_-10.6%_-3.4%_-4%]">
          <Asset name="a8d85.svg" width={14} height={21} className="block size-full max-w-none" />
        </div>
      </div>
    </Art>
  );
}

const tiles = [
  { Art: Equipment, caption: "Equipment, drawn in the drafting style. For decks and documents." },
  { Art: Process, caption: "A process, step by step. For the website and decks." },
  { Art: Interactive, caption: "On the website, figures react to the pointer. Built with Hairline." },
];

export function IllustrationTiles() {
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {tiles.map(({ Art: Figure, caption }) => (
        <li key={caption} className="group">
          <figure>
            <Figure />
            <figcaption className="pt-3 text-[13px] text-ui-muted">{caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
