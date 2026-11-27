import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";

export default function IntroductionPage() {
  return (
    <Shell
      pathname="/"
      hero={
        <header className="flex min-h-[min(100svh,922px)] flex-col justify-between gap-16 overflow-hidden bg-brand-redline px-5 pt-8 pb-10 text-ui-white sm:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p>
              <span className="block text-[17px] leading-normal font-semibold tracking-[-0.03em]">Candid</span>
              <span className="-mt-1 block text-[12.5px] leading-[1.3] tracking-[-0.01em] opacity-70">
                Brand system
              </span>
            </p>
            <p className="pt-1.5 text-[13px] tracking-[-0.01em] opacity-80">Sample for review, November 2026</p>
          </div>
          <h1 className="text-[clamp(3.25rem,13vw,10.5rem)] leading-[0.9] font-medium tracking-[-0.055em]">
            Brand
            <br />
            System
          </h1>
        </header>
      }
    >
      <Section
        id="who-we-are"
        title="Who we are"
        first
        description="Candid is an owner's engineering firm for gas-fired power. We take projects from concept to final investment decision in weeks, not months. Software tests every configuration for a site, current vendor quotes keep cost and schedule honest, and PE-licensed engineers stamp the package in the owner's own format. We have offices in Houston and San Francisco."
      />
    </Shell>
  );
}
