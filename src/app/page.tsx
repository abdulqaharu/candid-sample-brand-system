import { Shell } from "@/components/shell/shell";
import { Row } from "@/components/ui/row";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const audiences = [
  { code: "A1", title: "Owners and developers", quote: "Can we reach FID faster, with numbers our board will back?" },
  { code: "A2", title: "EPCs", quote: "Is this package good enough to price and build from?" },
  { code: "A3", title: "Lenders and independent engineers", quote: "Can we trust the cost, the schedule and the method?" },
  { code: "A4", title: "Permitting agencies", quote: "Is the design complete, consistent and properly stamped?" },
];

const voice = [
  { code: "V1", title: "Show the work", body: "Lead with deliverables, drawings and backtests. Proof does more than adjectives ever will." },
  { code: "V2", title: "Say the number", body: "±15%, 4 weeks, 12 scenarios. Always give the stage and the unit, so the claim holds up." },
  { code: "V3", title: "Engineer to engineer", body: "Plain and direct. No “revolutionary”, no “magic”. Write it so a PE would sign it." },
];

export default function OverviewPage() {
  return (
    <Shell
      pathname="/"
      title={
        <h1 className="text-display-xl font-medium text-fg">
          Candid
          <br />
          Brand system
        </h1>
      }
    >
      <Row eyebrow="01 / Company" title="What Candid is.">
        Candid is an owner&rsquo;s engineering firm for gas-fired power. We take
        projects from concept to final investment decision in weeks, not
        months. Software tests every configuration, and PE-licensed engineers
        stamp the result.
      </Row>

      <Row eyebrow="02 / Purpose" title="What this system is.">
        A kit of rules and ready-made parts: color, type, technical drawings
        and templates. It keeps every deck, one-pager and webpage recognizably
        Candid, even when no designer is in the room.
      </Row>

      <Row eyebrow="03 / Audiences" title="Who it speaks to.">
        Owners pay for the work, but three other groups must trust it before a
        project moves. Every material should answer the question each of them
        is asking.
      </Row>
      <Reveal className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((item) => (
          <Card key={item.code}>
            <Eyebrow>{item.code}</Eyebrow>
            <h4 className="mt-3 text-h3 text-fg">{item.title}</h4>
            <p className="mt-2 text-body-s text-fg-2">&ldquo;{item.quote}&rdquo;</p>
          </Card>
        ))}
      </Reveal>

      <Row eyebrow="04 / Voice" title="How Candid sounds.">
        Calm, exact and technical. The brand earns trust the way an engineer
        does: by showing the work and putting a number on it.
      </Row>
      <Reveal className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-3">
        {voice.map((item) => (
          <Card key={item.code}>
            <Eyebrow>{item.code}</Eyebrow>
            <h4 className="mt-3 text-h3 text-fg">{item.title}</h4>
            <p className="mt-2 text-body-s text-fg-2">{item.body}</p>
          </Card>
        ))}
      </Reveal>

      <Row eyebrow="05 / Note" title="About this sample.">
        This is a working sample to show the approach. Colors, type and
        visual rules are proposals built from Candid&rsquo;s current site, and
        would be refined with the team in the first sprint.
      </Row>
    </Shell>
  );
}
