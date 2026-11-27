import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { GridCarousel } from "@/components/layout/grid-carousel";

export const metadata: Metadata = { title: "Layout" };

export default function LayoutGuidePage() {
  return (
    <Shell pathname="/layout" title="Layout">
      <Section
        id="grid"
        title="Grid"
        first
        description="One grid for every format. Swipe through to see how the logo, headlines and drawings sit on it."
      >
        <GridCarousel />
      </Section>
    </Shell>
  );
}
