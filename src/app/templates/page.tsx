import { Shell } from "@/components/shell/shell";
import { Row } from "@/components/ui/row";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Scatter } from "@/components/drawings/scatter";
import { SlideTitle } from "@/components/templates/slide-title";
import { SlideProof } from "@/components/templates/slide-proof";
import { SlideProcess } from "@/components/templates/slide-process";
import { SlideDeliverables } from "@/components/templates/slide-deliverables";
import { OnePagerGrid } from "@/components/templates/one-pager-grid";

const notes = [
  "Header: Candid wordmark left, document code right (e.g. OP-01, REV A).",
  "Claim: one Display line and a two-sentence lead. The single most important message.",
  "Proof: three stat cards. Stage and unit on every number.",
  "Process: the four-step timeline from the deck, same order and wording.",
  "Drawing: a cropped excerpt of a real deliverable, labeled with its code.",
  "Call to action and contact. One Redline button, nothing else in red.",
];

export default function TemplatesPage() {
  return (
    <Shell
      pathname="/templates"
      title={<h1 className="text-display-l font-medium text-fg">Templates</h1>}
    >
      <Row eyebrow="01 / Why" title="Templates, not one-offs.">
        Ready-made layouts for the materials the team makes most. Each one is
        built from the tokens on the previous pages, so anyone can make a
        deck or one-pager that looks right the first time.
      </Row>

      <Row eyebrow="02 / Deck" title="Slide layouts.">
        Four layouts cover most sales and investor decks: open strong, prove
        it with numbers, explain the process, then show the deliverables.
      </Row>
      <div className="grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2">
        <SlideTitle />
        <SlideProof />
        <SlideProcess />
        <SlideDeliverables />
      </div>

      <Row eyebrow="03 / Parts" title="Components.">
        The parts that repeat across the website, decks and documents. Built
        once, reused everywhere, and ready to become code components on the
        website.
      </Row>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-3">
        <StatCard eyebrow="Pre-FEED" value="4 weeks" caption="From your constraints to a PE-stamped package." />
        <Card>
          <Eyebrow variant="muted">Backtest &middot; 14 built plants</Eyebrow>
          <div className="mt-3">
            <Scatter />
          </div>
          <p className="mt-2 text-label text-fg-3">Estimate vs actual installed cost</p>
          <p className="mt-2 text-body-s text-fg-2">
            Every estimate within &plusmn;15% of what the plant actually cost.
          </p>
        </Card>
        <Card>
          <Eyebrow>Free revalidation</Eyebrow>
          <h4 className="mt-3 text-h3 text-fg">
            Send us a plant you have already built.
          </h4>
          <p className="mt-2 text-body-s text-fg-2">
            We run it blind and show you how close we land. No cost, no
            commitment.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="primary">Book a call</Button>
            <Button variant="secondary">Get sample deliverables</Button>
          </div>
        </Card>
      </div>

      <Row eyebrow="04 / Document" title="One-pager grid.">
        US Letter, 12 columns, 36pt margins. The same six zones every time,
        so a new one-pager is a matter of filling in the blanks. Light by
        default, Dark for presentations.
      </Row>
      <div className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-[1fr_1fr] sm:items-start">
        <OnePagerGrid />
        <ol className="flex flex-col gap-4">
          {notes.map((note, i) => (
            <li key={note} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-redline text-[12px] text-on-accent">
                {i + 1}
              </span>
              <p className="text-body-s text-fg-2">{note}</p>
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}
