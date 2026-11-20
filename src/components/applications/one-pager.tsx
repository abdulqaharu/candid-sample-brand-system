import { Button } from "@/components/ui/button";
import { PlotPlan } from "@/components/drawings/plot-plan";

const stats = [
  { label: "Pre-FEED", value: "4 wks", caption: "Class 4 estimate" },
  { label: "FEED", value: "12 wks", caption: "Class 3 estimate" },
  { label: "Backtested", value: "±15%", caption: "vs. 14 built plants" },
];

const steps = [
  { num: "01", title: "Your constraints", detail: "Site, interconnection, turbines" },
  { num: "02", title: "12 scenarios", detail: "Software tests every option" },
  { num: "03", title: "Live quotes", detail: "Cost and lead times stay current" },
  { num: "04", title: "PE-stamped", detail: "D04 to D17, in your format" },
];

export function OnePager() {
  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col rounded-[2px] border border-line bg-canvas p-[5%]">
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <span className="text-[16px] font-semibold text-fg">Candid</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">
          OP-01 &middot; REV A
        </span>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-redline-text">
        Owner&rsquo;s engineering &middot; Gas-fired power
      </p>
      <p className="mt-2 text-[24px] font-medium leading-tight text-fg">
        Concept to FID, in weeks.
      </p>
      <p className="mt-2 text-[12px] text-fg-2">
        Pre-FEED and FEED packages for gas-fired power, produced with
        software and stamped by PE-licensed engineers. Built in your
        templates, ready for your board, lender and EPC.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[2px] border border-line p-2.5">
            <p className="text-[8px] uppercase tracking-[0.04em] text-fg-3">{stat.label}</p>
            <p className="mt-1 text-[16px] font-medium text-fg">{stat.value}</p>
            <p className="mt-0.5 text-[9px] text-fg-2">{stat.caption}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.04em] text-fg-3">How it works</p>
          <ul className="mt-2 flex flex-col gap-2">
            {steps.map((step) => (
              <li key={step.num} className="flex gap-2">
                <span className="font-mono text-[9px] text-fg-3">{step.num}</span>
                <span>
                  <span className="block text-[11px] font-medium text-fg">{step.title}</span>
                  <span className="text-[9px] text-fg-2">{step.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[128px]">
          <PlotPlan className="w-full rounded-[2px] border border-line" />
          <p className="mt-1 text-center font-mono text-[8px] uppercase tracking-[0.06em] text-fg-3">
            D05 Plot plan
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-[2px] bg-raised p-3">
        <div>
          <p className="text-[11px] font-medium text-fg">Free revalidation</p>
          <p className="text-[9px] text-fg-2">
            Send us a plant you have built. We run it blind.
          </p>
        </div>
        <Button variant="primary" size="compact">
          Book a call
        </Button>
      </div>

      <div className="mt-4 flex items-baseline justify-between text-[8px] uppercase tracking-[0.04em] text-fg-3">
        <span>Candid.engineering</span>
        <span>Houston &middot; San Francisco</span>
      </div>
    </div>
  );
}
