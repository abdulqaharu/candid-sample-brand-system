import { Shell } from "@/components/shell/shell";
import { Row } from "@/components/ui/row";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PlotPlan } from "@/components/drawings/plot-plan";
import { AnnotationAnatomy } from "@/components/drawings/annotation-anatomy";
import { RedlineDo, RedlineDont } from "@/components/drawings/redline-examples";
import { CodeTag } from "@/components/ui/code-tag";

const lineWeights = [
  { name: "Primary", spec: "2px draft", use: "Equipment, buildings, anything that gets built", kind: "primary" as const },
  { name: "Secondary", spec: "1px draft", use: "Pipes, ducts, connections, leader lines", kind: "secondary" as const },
  { name: "Construction", spec: "1px dashed 10/6 drawing", use: "Property lines, boundaries, centerlines, future scope", kind: "construction" as const },
  { name: "Grid", spec: "1px line, reduced opacity", use: "Background grid only. Never behind body text", kind: "grid" as const },
];

const deliverables = [
  { code: "D04", name: "Heat and material balance" },
  { code: "D05", name: "Plot plan" },
  { code: "D06", name: "Single-line diagram" },
  { code: "D16", name: "CAPEX estimate" },
  { code: "D17", name: "Schedule" },
];

function LineSample({ kind }: { kind: "primary" | "secondary" | "construction" | "grid" }) {
  const common = { x1: 0, y1: 20, x2: 280, y2: 20 };
  const style =
    kind === "primary"
      ? { stroke: "var(--accent-draft)", strokeWidth: 2 }
      : kind === "secondary"
        ? { stroke: "var(--accent-draft)", strokeWidth: 1 }
        : kind === "construction"
          ? { stroke: "var(--line-drawing)", strokeWidth: 1, strokeDasharray: "10 6" }
          : { stroke: "var(--border-default)", strokeWidth: 1, opacity: 0.6 };
  return (
    <svg viewBox="0 0 280 40" className="h-10 w-[280px]" role="presentation">
      <line {...common} {...style} />
    </svg>
  );
}

export default function VisualLanguagePage() {
  return (
    <Shell
      pathname="/visual-language"
      title={<h1 className="text-display-l font-medium text-fg">Visual language</h1>}
    >
      <Row eyebrow="01 / Principle" title="Drawings are the brand.">
        Candid&rsquo;s work is drawings: plot plans, single-lines and heat
        balances. So instead of stock photos, the brand uses that linework as
        its main visual. It is honest, specific to the work, and hard for
        anyone else to copy.
      </Row>
      <div className="pb-10">
        <PlotPlan animate className="w-full rounded-[2px] border border-line" />
      </div>

      <Row eyebrow="02 / Linework" title="Line weights.">
        Three weights, borrowed from engineering drafting. Heavier lines are
        things that get built. Lighter lines explain them.
      </Row>
      <div className="flex flex-col divide-y divide-line pb-10">
        {lineWeights.map((line) => (
          <div key={line.name} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
            <LineSample kind={line.kind} />
            <div>
              <p className="text-[16px] font-medium text-fg">{line.name}</p>
              <p className="text-label text-fg-3">{line.spec}</p>
            </div>
            <p className="text-body-s text-fg-2 sm:ml-auto sm:max-w-[360px]">{line.use}</p>
          </div>
        ))}
      </div>

      <Row eyebrow="03 / Labels" title="Annotation.">
        Labels explain the drawing without cluttering it. They follow one
        pattern everywhere: on drawings, in charts and on the website.
      </Row>
      <div className="pb-10">
        <AnnotationAnatomy />
      </div>

      <Row eyebrow="04 / Codes" title="Deliverable codes.">
        Candid already numbers its deliverables. We turn those codes into a
        visual system: tags that mark sections in decks, documents and on the
        website, so a reader always knows which part of the package they are
        looking at.
      </Row>
      <div className="flex flex-wrap gap-3 pb-10">
        {deliverables.map((item) => (
          <CodeTag key={item.code} code={item.code} name={item.name} />
        ))}
      </div>

      <Row eyebrow="05 / Emphasis" title="Redline, once.">
        In drafting, red marks a change. In Candid materials it marks the one
        thing to look at: a revision, a saving, a key number. One Redline
        callout per view. The only other red allowed is the primary button.
      </Row>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2">
        <RedlineDo />
        <RedlineDont />
      </div>

      <Row eyebrow="06 / Grid" title="Blueprint grid.">
        A 40px grid with a heavier line every 200px. Use it on covers, hero
        sections and behind diagrams to say &ldquo;engineered&rdquo; without a
        single word. Keep it off text-heavy pages.
      </Row>
      <div className="flex min-h-[320px] flex-col justify-end rounded-[2px] bg-blueprint p-8 pb-10">
        <Eyebrow>Concept to FID &middot; Gas-fired power</Eyebrow>
        <h4 className="mt-3 text-h1 text-fg">Months of engineering, done in weeks.</h4>
      </div>
    </Shell>
  );
}
