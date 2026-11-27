import { Box, Line, Sprite, Text } from "./parts";

// The photos are placeholders in the design. Replace the flat fills when real photos arrive.

const mono = "font-mono text-xs font-medium tracking-[0.08em] text-brand-paper";

function Tag({ x, children }: { x: number; children: string }) {
  return (
    <p
      className="absolute top-5 rounded-xs bg-brand-ink px-2.5 py-1.5 text-[11px] leading-[normal] font-medium tracking-[0.04em] text-brand-paper opacity-85"
      style={x < 0 ? { right: -x } : { left: x }}
    >
      {children}
    </p>
  );
}

function Photo({
  w,
  h,
  fill = "bg-brand-ink-600",
  note,
  noteX,
}: {
  w: number;
  h: number;
  fill?: string;
  note: string;
  noteX: number;
}) {
  return (
    <>
      <Box x={0} y={0} w={w} h={h} className={fill} />
      <Box x={0} y={h * 0.55} w={w} h={h * 0.45} className="bg-linear-to-b from-brand-ink/0 to-brand-ink/55" />
      <Text x={noteX} y={h - 38} className="text-sm text-brand-paper opacity-55">
        {note}
      </Text>
    </>
  );
}

/** A dot with a 45 degree leader and a flat run toward its label. */
function Callout({ x, y, run, src }: { x: number; y: number; run: number; src: string }) {
  return (
    <>
      <Sprite src="4f069.svg" x={x - 3} y={y - 3} w={6} />
      <Line src="5a81d.svg" box={[x, y - 40, 40, 40]} length={56.57} rotate={-45} />
      <Line src={src} box={[x + 40, y - 40, run, 0]} />
    </>
  );
}

const outline = "border-[1.5px] border-brand-paper";

export function PlantPhoto() {
  return (
    <>
      <Photo w={1200} h={600} note="Replace with photo: combined-cycle plant, wide shot" noteX={840} />
      <Box x={300} y={250} w={200} h={110} className={outline} />
      <Box x={560} y={250} w={200} h={110} className={outline} />
      <Box x={800} y={170} w={60} h={190} className={outline} />
      <Box x={330} y={380} w={400} h={60} className="border border-dashed border-brand-draft-300" />
      <Callout x={500} y={250} run={100} src="8a27a.svg" />
      <Text x={548} y={190} className={mono}>
        GT-1  7HA.02
      </Text>
      <Callout x={860} y={170} run={110} src="87e9d.svg" />
      <Text x={908} y={110} className={mono}>
        HRSG STACK  ·  45 M
      </Text>
      <Sprite src="4a991.png" x={470} y={230} w={120} h={150} />
      <Text x={440} y={392} className="font-mono text-xs font-medium tracking-[0.08em] text-brand-redline-400">
        REV B: +20 FT SPACING
      </Text>
      <Text x={20} y={564} className={`${mono} opacity-80`}>
        D05  ·  SITE A  ·  2×1 COMBINED CYCLE
      </Text>
      <Tag x={20}>Photo + linework</Tag>
    </>
  );
}

export function TurbinePhoto() {
  return (
    <>
      <Photo w={596} h={397} note="Replace with photo: turbine hall, close-up" noteX={309} />
      <Box x={150} y={140} w={280} h={130} className={outline} />
      <Callout x={430} y={140} run={90} src="3f7d5.svg" />
      <Text x={478} y={80} className={mono}>
        GT-1  7HA.02
      </Text>
      <Text x={150} y={282} className={`${mono} opacity-80`}>
        420 MW  ·  SIMPLE CYCLE
      </Text>
      <Tag x={20}>Photo + linework</Tag>
    </>
  );
}

export function SwitchyardPhoto() {
  return (
    <>
      <Photo w={596} h={397} note="Replace with photo: substation or switchyard" noteX={287} />
      {[180, 240, 300, 360].map((x) => (
        <Line key={x} src="96dd6.svg" box={[x, 120, 0, 180]} length={180} rotate={90} stroke={1.5} />
      ))}
      <Line src="115be.svg" box={[150, 140, 240, 0]} stroke={1.5} />
      <Callout x={390} y={140} run={110} src="87e9d.svg" />
      <Text x={438} y={80} className={mono}>
        SWITCHYARD  345 KV
      </Text>
      <Tag x={20}>Photo + linework</Tag>
    </>
  );
}

export function PeoplePhoto({ note, noteX }: { note: string; noteX: number }) {
  return (
    <>
      <Photo w={596} h={397} fill="bg-brand-ink-400" note={note} noteX={noteX} />
      <Tag x={20}>Photo only</Tag>
    </>
  );
}

export function DrawingTag() {
  return <Tag x={-20}>Drawing only</Tag>;
}
