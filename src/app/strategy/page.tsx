import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Strategy" };

export default function StrategyPage() {
  return (
    <Shell pathname="/strategy" title="Strategy">
      <section id="overview" aria-labelledby="overview-title" className="py-12 md:py-19">
        <Reveal>
          <h2 id="overview-title" className="text-[13px] tracking-[-0.01em] text-ui-text-2">
            Overview
          </h2>
          <p className="max-w-[900px] pt-5 text-2xl leading-[1.28] tracking-[-0.025em] md:text-3xl">
            We turn months of engineering into weeks, so new power gets built sooner, with numbers that
            owners, builders and lenders can all trust.
          </p>
        </Reveal>
      </section>
      <Section
        id="mission"
        title="Mission"
        description="Our mission is to get new power built faster. Owners and developers come to us with a site, a grid position and a turbine reservation. Our software evaluates every configuration, our engineers refine the best one with current vendor quotes, and PE-licensed engineers stamp the result. Pre-FEED in about 4 weeks, FEED in about 12, with estimates backtested against plants that have already been built."
      />
      <Section
        id="brand"
        title="Brand"
        description="Candid is an owner's engineering firm with offices in Houston and San Francisco, backed by Schneider Electric Ventures. Our audience is technical and careful: owners and developers, the EPCs who build, and the lenders and independent engineers who check the numbers. The brand earns their trust the way an engineer does, by showing the work and putting a number on it."
      />
    </Shell>
  );
}
