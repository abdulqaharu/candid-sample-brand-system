import { Shell } from "@/components/shell/shell";
import { Row } from "@/components/ui/row";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Swatch } from "@/components/ui/swatch";
import { ThemeScope } from "@/components/ui/theme-scope";
import {
  inkSwatches,
  paperPrimitives,
  signalPrimitives,
  semanticTokens,
  primitiveHex,
} from "@/lib/tokens";

const balance = [
  { label: "Canvas 66%", width: 66, hex: primitiveHex["paper-50"], outline: true },
  { label: "Surface 16%", width: 16, hex: primitiveHex["paper-100"] },
  { label: "Ink 12%", width: 12, hex: primitiveHex["ink-950"] },
  { label: "Draft 4%", width: 4, hex: primitiveHex["draft-600"] },
  { label: "Red 2%", width: 2, hex: primitiveHex["redline-500"] },
];

export default function ColorPage() {
  return (
    <Shell
      pathname="/color"
      title={<h1 className="text-display-l font-medium text-fg">Color</h1>}
    >
      <Row eyebrow="01 / Primitives" title="Palette.">
        Candid is light by default: warm paper whites, near-black ink and one
        sharp accent. Redline is the color engineers use to mark what
        changed, so we use it the same way: sparingly, to point at what
        matters. Draft blue is for drawings and data.
      </Row>
      <div className="flex flex-col gap-8 pb-10">
        <div>
          <Eyebrow variant="muted">Ink</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {inkSwatches.map((item) => (
              <Swatch key={item.token} item={item} height={140} />
            ))}
          </div>
        </div>
        <div>
          <Eyebrow variant="muted">Paper</Eyebrow>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {paperPrimitives.map((item) => (
              <Swatch key={item.token} item={item} height={120} />
            ))}
          </div>
        </div>
        <div>
          <Eyebrow variant="muted">Signal</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {signalPrimitives.map((item) => (
              <Swatch key={item.token} item={item} height={120} />
            ))}
          </div>
        </div>
      </div>

      <Row eyebrow="02 / Balance" title="Proportion.">
        Mostly canvas. Accents are rare, so they carry meaning. If a page has
        more than one Redline element, one of them is probably wrong.
      </Row>
      <div className="pb-10">
        <div className="flex h-[180px] w-full overflow-hidden rounded-[2px]">
          {balance.map((segment) => (
            <div
              key={segment.label}
              style={{
                width: `${segment.width}%`,
                backgroundColor: segment.hex,
                boxShadow: segment.outline ? "inset 0 0 0 1px var(--border-default)" : undefined,
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex w-full">
          {balance.map((segment) => (
            <p
              key={segment.label}
              style={{ width: `${segment.width}%` }}
              className="text-label text-fg-3"
            >
              {segment.label}
            </p>
          ))}
        </div>
      </div>

      <Row eyebrow="03 / Tokens" title="Semantic tokens.">
        Designs use these names, never raw hex values. Each token points to a
        primitive and switches automatically between Light and Dark.
      </Row>
      <div className="overflow-x-auto pb-10">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-line text-left text-label text-fg-3">
              <th className="py-3 pr-4 font-medium">Token</th>
              <th className="py-3 pr-4 font-medium">Light (default)</th>
              <th className="py-3 pr-4 font-medium">Dark</th>
              <th className="py-3 font-medium">Use</th>
            </tr>
          </thead>
          <tbody>
            {semanticTokens.map((row) => (
              <tr key={row.token} className="border-b border-line">
                <td className="py-3 pr-4 font-mono text-code text-fg">{row.token}</td>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block h-5 w-5 rounded-[2px] border border-line"
                      style={{ backgroundColor: primitiveHex[row.light] }}
                    />
                    <span className="font-mono text-code text-fg-3">{row.light}</span>
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block h-5 w-5 rounded-[2px] border border-line"
                      style={{ backgroundColor: primitiveHex[row.dark] }}
                    />
                    <span className="font-mono text-code text-fg-3">{row.dark}</span>
                  </span>
                </td>
                <td className="py-3 text-body-s text-fg-2">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Row eyebrow="04 / Screen and print" title="Color modes.">
        Two modes from one set of tokens. Light is the default, for the
        website, documents and print. Dark is for presentations, events and
        hero moments. Switch the mode and every color follows.
      </Row>
      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2">
        <ThemeScope theme="light" className="rounded-[2px] border border-line p-6">
          <Eyebrow>Light (default)</Eyebrow>
          <h4 className="mt-3 text-h2 text-fg">Pre-FEED in 4 weeks.</h4>
          <p className="mt-2 text-body-m text-fg-2">
            Plot plan, heat balance, single-line, CAPEX and schedule, stamped
            by PE-licensed engineers.
          </p>
          <span className="mt-4 inline-flex items-center rounded-[2px] border border-verified px-3 py-1.5 font-mono text-label-mono text-verified">
            PE stamped &middot; D04 / D05 / D06
          </span>
        </ThemeScope>
        <ThemeScope theme="dark" className="rounded-[2px] border border-line p-6">
          <Eyebrow>Dark</Eyebrow>
          <h4 className="mt-3 text-h2 text-fg">Pre-FEED in 4 weeks.</h4>
          <p className="mt-2 text-body-m text-fg-2">
            Plot plan, heat balance, single-line, CAPEX and schedule, stamped
            by PE-licensed engineers.
          </p>
          <span className="mt-4 inline-flex items-center rounded-[2px] border border-verified px-3 py-1.5 font-mono text-label-mono text-verified">
            PE stamped &middot; D04 / D05 / D06
          </span>
        </ThemeScope>
      </div>

      <Row eyebrow="05 / Contrast" title="Accessibility.">
        Text on a Redline fill is always Ink 950 (5.7:1). White on Redline is
        only 3.5:1, so it fails. On light backgrounds, red text uses Redline
        600 (#C8401C, 4.6:1); Redline 500 is for fills, lines and dark mode.
      </Row>
    </Shell>
  );
}
