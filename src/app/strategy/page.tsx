import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Strategy" };

export default function StrategyPage() {
  return (
    <Shell pathname="/strategy" title="Strategy">
      <Section
        id="mission"
        title="Mission"
        description="Our mission is to get new power built faster. Owners and developers come to us with a site, a grid position and a turbine reservation. Our software evaluates every configuration, our engineers refine the best one with current vendor quotes, and PE-licensed engineers stamp the result. Pre-FEED in about 4 weeks, FEED in about 12, with estimates backtested against plants that have already been built."
      />
      <Section
        id="brand"
        title="Brand"
        description="Candid Intelligence is an owner's engineering firm with offices in Houston and San Francisco, backed by Schneider Electric Ventures. Our audience is technical and careful: owners and developers, the EPCs who build, and the lenders and independent engineers who check the numbers. The brand earns their trust the way an engineer does, by showing the work and putting a number on it."
      />
    </Shell>
  );
}
