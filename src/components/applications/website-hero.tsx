import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { PlotPlan } from "@/components/drawings/plot-plan";

const navLinks = ["Process", "Proof", "Deliverables", "Security", "FAQ"];

const audienceChips = ["Owner / developer", "EPC", "Lender / IE"];

const stages = [
  { label: "Pre-FEED", value: "4 weeks", caption: "Class 4 estimate, ±40%" },
  { label: "FEED", value: "12 weeks", caption: "Class 3 estimate, ±15%" },
  { label: "Scenarios", value: "12", caption: "Configurations tested per site" },
  { label: "Delivery", value: "PE-stamped", caption: "In your templates" },
];

export function WebsiteHero() {
  return (
    <div className="overflow-hidden rounded-[4px] border border-line">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-raised" />
          <span className="h-2.5 w-2.5 rounded-full bg-raised" />
          <span className="h-2.5 w-2.5 rounded-full bg-raised" />
        </div>
        <span className="mx-auto rounded-full bg-raised px-4 py-1 font-mono text-[11px] text-fg-3">
          candid.engineering
        </span>
      </div>

      <div className="bg-canvas px-5 py-4 sm:px-10">
        <nav className="flex items-center justify-between" aria-label="Site preview navigation">
          <span className="text-[22px] font-semibold text-fg">Candid</span>
          <div className="hidden gap-6 text-body-s text-fg-2 sm:flex">
            {navLinks.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
          <Button variant="secondary">Book a call</Button>
        </nav>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-label font-medium uppercase text-redline-text">
              Owner&rsquo;s engineering &middot; Gas-fired power
            </p>
            <h2 className="mt-4 text-h1 text-fg">
              Months of engineering, done in weeks.
            </h2>
            <p className="mt-4 text-body-l text-fg-2">
              Concept to FID for gas-fired power. Software tests every
              configuration for your site, and PE-licensed engineers stamp
              the package in your format.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary">Book a call</Button>
              <Button variant="secondary">Get sample deliverables</Button>
            </div>
            <p className="mt-8 text-label text-fg-3">I am an</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {audienceChips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>
          </div>
          <PlotPlan className="w-full" />
        </div>

        <div className="mt-10 grid grid-cols-2 divide-x divide-line border-t border-line sm:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.label} className="px-4 py-6 first:pl-0">
              <p className="text-label text-fg-3">{stage.label}</p>
              <p className="mt-1 text-[22px] font-medium text-fg">{stage.value}</p>
              <p className="mt-1 text-body-s text-fg-2">{stage.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
