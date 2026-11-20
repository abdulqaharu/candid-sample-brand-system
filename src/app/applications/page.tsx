import { Shell } from "@/components/shell/shell";
import { Row } from "@/components/ui/row";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ThemeScope } from "@/components/ui/theme-scope";
import { WebsiteHero } from "@/components/applications/website-hero";
import { OnePager } from "@/components/applications/one-pager";

export default function ApplicationsPage() {
  return (
    <Shell
      pathname="/applications"
      title={<h1 className="text-display-l font-medium text-fg">Applications</h1>}
    >
      <Row eyebrow="01 / Overview" title="The system at work.">
        Applied to what Candid needs most right now: the website and the
        customer materials. Same tokens, same type, same drawings.
      </Row>

      <Row eyebrow="02 / Website" title="Website, hero.">
        The hero fixes three things: accuracy is stated per stage, so
        &plusmn;15% and &plusmn;40% no longer contradict each other; the
        drawing replaces generic imagery; and each audience gets its own
        path in.
      </Row>
      <div className="pb-10">
        <WebsiteHero />
      </div>

      <Row eyebrow="03 / Customer materials" title="One-pager.">
        The same page in both modes. Light by default for print, PDF and
        email. Dark for presentations and events. Built on the one-pager
        grid, so the team can swap the claim, stats and drawing for each
        project.
      </Row>
      <div className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-2">
        <div>
          <ThemeScope theme="light" className="rounded-[2px] p-4">
            <OnePager />
          </ThemeScope>
          <Eyebrow variant="muted" className="mt-3 text-center">
            Light (default)
          </Eyebrow>
        </div>
        <div>
          <ThemeScope theme="dark" className="rounded-[2px] p-4">
            <OnePager />
          </ThemeScope>
          <Eyebrow variant="muted" className="mt-3 text-center">
            Dark
          </Eyebrow>
        </div>
      </div>
    </Shell>
  );
}
