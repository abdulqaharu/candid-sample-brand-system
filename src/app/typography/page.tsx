import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { Asset } from "@/components/ui/asset";
import { TypeTester } from "@/components/typography/type-tester";

export const metadata: Metadata = { title: "Typography" };

const hierarchy = [
  {
    name: "Display",
    weight: "Medium",
    size: "64px",
    leading: "1",
    tracking: "−2.5%",
    sample: "Pre-FEED in 4 weeks.",
    className: "text-[clamp(2.25rem,6vw,4rem)] leading-none font-medium tracking-[-0.025em]",
  },
  {
    name: "Heading",
    weight: "Medium",
    size: "40px",
    leading: "1.1",
    tracking: "−1.5%",
    sample: "Backtested against built plants",
    className: "text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.015em]",
  },
  {
    name: "Subheading",
    weight: "Medium",
    size: "24px",
    leading: "1.25",
    tracking: "0%",
    sample: "PE-stamped, in your format",
    className: "text-2xl leading-[1.25] font-medium",
  },
  {
    name: "Body",
    weight: "Regular",
    size: "16px",
    leading: "1.4",
    tracking: "0%",
    sample:
      "Software tests every configuration for your site, and engineers take the best one to the next gate. Let the headings above do the shouting.",
    className: "max-w-[606px] text-base leading-[1.4]",
  },
  {
    name: "Caption",
    weight: "Regular",
    size: "12px",
    leading: "1.4",
    tracking: "1%",
    sample: "D05 plot plan · Rev B · Site A",
    className: "text-xs leading-[1.4] tracking-[0.01em]",
  },
];

export default function TypographyPage() {
  return (
    <Shell pathname="/typography" title="Typography">
      <Section
        id="typeface"
        title="Typeface"
        first
        description="Our typeface is Geist, a clean, modern sans serif that is free and open source. It is used for headlines, body copy, labels and numbers across all of Candid's materials. Geist Mono is used sparingly, only on drawing annotations and deliverable codes such as D05."
      >
        <div className="grid overflow-hidden rounded-lg bg-ui-panel lg:min-h-119 lg:grid-cols-[7fr_5fr]">
          <div className="flex min-w-0 flex-col p-8">
            <p className="text-xs text-ui-muted">Primary</p>
            <p className="pt-3 text-[clamp(4.5rem,11vw,8.4rem)] leading-[0.92] font-medium tracking-[-0.04em]">
              Geist
            </p>
            <div className="pt-9 text-[clamp(0.9rem,2.2vw,1.68rem)] leading-[1.45] tracking-[-0.015em] wrap-break-word text-ui-text-2">
              <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p>abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
            <dl className="mt-auto border-t border-ui-text/8 pt-6 max-lg:mt-10">
              <dt className="text-xs text-ui-muted">Classification</dt>
              <dd className="pt-1.5 text-base tracking-[-0.015em]">Modern grotesque</dd>
            </dl>
          </div>
          <div className="grid h-80 grid-cols-2 lg:h-auto">
            {[
              ["Regular", "bg-ui-panel-2 font-normal"],
              ["Medium", "bg-ui-next font-medium"],
            ].map(([weight, className]) => (
              <div key={weight} className={`relative overflow-hidden ${className}`}>
                <p className="absolute top-3 left-3 text-[13px] font-normal text-ui-text-2">{weight}</p>
                <p
                  aria-hidden
                  className="absolute -bottom-21 -left-6 text-[384px] leading-none tracking-normal"
                >
                  a
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="try-it" title="Try it">
        <TypeTester />
      </Section>

      <Section
        id="hierarchy"
        title="Hierarchy"
        description="Hierarchy shows readers where to focus. Headlines use Geist Medium with tight tracking, clearly larger than body copy. Body copy uses Geist Regular at a comfortable size. Headlines are in sentence case, and every number carries its unit and, where it matters, its project stage."
      >
        <ul className="border-b border-ui-rule">
          {hierarchy.map((row) => (
            <li key={row.name} className="grid gap-4 border-t border-ui-rule py-9 md:grid-cols-[180px_1fr] md:gap-10">
              <div className="text-[12.5px] leading-normal tracking-[-0.01em] text-ui-muted">
                <p className="text-[13.5px] font-medium text-ui-text">{row.name}</p>
                <p>{row.weight}</p>
                <p className="flex items-center gap-2.5">
                  {row.size}
                  <span className="flex items-center gap-0.75">
                    <Asset name="48789.svg" width={11} height={11} />
                    <span className="sr-only">Line height</span>
                    {row.leading}
                  </span>
                  <span className="flex items-center gap-0.75">
                    <Asset name="1e3c9.svg" width={11} height={11} />
                    <span className="sr-only">Tracking</span>
                    {row.tracking}
                  </span>
                </p>
              </div>
              <p className={row.className}>{row.sample}</p>
            </li>
          ))}
        </ul>
      </Section>
    </Shell>
  );
}
