import { Shell } from "@/components/shell/shell";
import { Row } from "@/components/ui/row";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/shell/theme-switcher";
import { typeScale } from "@/lib/tokens";

const alphabet = "A to Z, a to z, 0 to 9, ±%$";

const rules = [
  { code: "T1", title: "Mono, sparingly", body: "Only on drawings, deliverable codes and token names. Never for headlines, stats or sentences." },
  { code: "T2", title: "Numbers carry units", body: "Write 4 weeks, ±15%, 500 MW. Give the stage with any accuracy claim." },
  { code: "T3", title: "Sentence case", body: "Headlines in sentence case. Small labels in uppercase Geist Medium, tracked +4%." },
  { code: "T4", title: "One display line", body: "Use a Display style once per page or slide. Let it carry the message." },
];

export default function TypographyPage() {
  return (
    <Shell
      pathname="/typography"
      title={<h1 className="text-display-l font-medium text-fg">Typography</h1>}
    >
      <div className="flex justify-end pt-10">
        <ThemeSwitcher />
      </div>

      <Row eyebrow="01 / Families" title="Typefaces.">
        Geist does almost all the work: headlines, body copy, labels and
        numbers. Geist Mono is used sparingly, only where an engineer would
        expect it: drawing annotations, deliverable codes and token names.
        Both are free and open source.
      </Row>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2">
        <Card>
          <p className="text-display-xl font-medium text-fg">Aa</p>
          <p className="mt-4 text-h3 text-fg">Geist</p>
          <p className="mt-1 text-body-s text-fg-2">
            Headlines, body copy, labels and numbers
          </p>
          <p className="mt-4 text-body-s text-fg-3">{alphabet}</p>
        </Card>
        <Card>
          <p className="font-mono text-display-xl font-medium text-fg">D05</p>
          <p className="mt-4 text-h3 text-fg">Geist Mono</p>
          <p className="mt-1 text-body-s text-fg-2">
            Drawing annotations and deliverable codes only
          </p>
          <p className="mt-4 font-mono text-body-s text-fg-3">{alphabet}</p>
        </Card>
      </div>

      <Row eyebrow="02 / Scale" title="Type scale.">
        Twelve styles cover every deck, document and page. Only two are mono,
        and they stay on drawings and codes. Each one is a Figma text style
        and a code token, so design and the website stay in sync.
      </Row>
      <div className="flex flex-col divide-y divide-line pb-10">
        {typeScale.map((row) => (
          <div key={row.name} className="flex flex-col gap-4 py-6 sm:flex-row">
            <div className="w-full sm:w-[300px] sm:flex-shrink-0">
              <p className="text-[16px] font-medium text-fg">{row.name}</p>
              <p className="mt-1 text-label text-fg-3">{row.spec}</p>
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`${row.tailwind} ${row.mono ? "font-mono" : ""} ${row.upper ? "uppercase" : ""} font-medium text-fg`}
              >
                {row.sample}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Row eyebrow="03 / Usage" title="Rules.">
        A few rules keep the system consistent, even when someone outside
        design builds the slide.
      </Row>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {rules.map((rule) => (
          <Card key={rule.code}>
            <Eyebrow>{rule.code}</Eyebrow>
            <h4 className="mt-3 text-h3 text-fg">{rule.title}</h4>
            <p className="mt-2 text-body-s text-fg-2">{rule.body}</p>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
