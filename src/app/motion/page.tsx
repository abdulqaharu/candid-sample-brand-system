import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { CopyButton } from "@/components/ui/copy-button";
import { Curve } from "@/components/motion/curve";
import { MotionDemos } from "@/components/motion/demos";
import { PauseToggle } from "@/components/motion/pause-toggle";

export const metadata: Metadata = { title: "Motion" };

const copies = [
  { label: "CSS", value: "transition-timing-function: cubic-bezier(0.2, 0, 0, 1);" },
  { label: "After Effects", value: "0.2, 0, 0, 1" },
  { label: "Framer", value: "ease: [0.2, 0, 0, 1]" },
];

export default function MotionPage() {
  return (
    <Shell pathname="/motion" title="Motion">
      {/* Tucked up under the overview. */}
      <div className="-mt-6 flex pb-2 md:-mt-11">
        <PauseToggle />
      </div>
      <Section id="curve" title="Curve" first>
        <div className="grid items-end gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-ui-panel p-6">
            <Curve />
          </div>
          <div className="text-sm leading-[1.45] tracking-[-0.01em] text-ui-text-2">
            <p className="text-ui-text">Signature: ease in and out</p>
            <p>cubic-bezier(0.2, 0, 0, 1)</p>
            <p className="pt-3">Fast 150ms · Base 300ms · Slow 500ms</p>
            <p className="pt-3">Fades take about half as long as the move they go with.</p>
            <div className="flex flex-wrap items-center gap-2 pt-6">
              <span className="pr-1 text-[13px] text-ui-muted">Copy for</span>
              {copies.map((copy) => (
                <CopyButton key={copy.label} {...copy} />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section id="in-use" title="In use">
        <MotionDemos />
      </Section>
    </Shell>
  );
}
