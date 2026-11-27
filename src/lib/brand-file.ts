import { paletteList, formatColor } from "./tokens";

export function paletteFile() {
  const rows = paletteList.map(
    (c) =>
      `${c.name}\n  HEX ${c.hex}\n  RGB ${formatColor(c.hex, "RGB")}\n  CMYK ${formatColor(c.hex, "CMYK")}`,
  );
  return `Candid color palette\n\n${rows.join("\n\n")}\n`;
}

export function brandFile() {
  const colors = paletteList.map((c) => `- ${c.name}: ${c.hex}`).join("\n");
  return `# Candid brand system

Sample for review, November 2026.

## Who we are

Candid is an owner's engineering firm for gas-fired power. We take projects from concept to final investment decision in weeks, not months. Software tests every configuration for a site, current vendor quotes keep cost and schedule honest, and PE-licensed engineers stamp the package in the owner's own format. We have offices in Houston and San Francisco.

## Color

${colors}

Redline is used sparingly, to point at what matters. Draft blue is for drawings, charts and data, and Stamp green marks work that is verified. Accent colors are never paired with each other.

## Typography

Geist for headlines, body copy, labels and numbers. Geist Mono only on drawing annotations and deliverable codes such as D05. Headlines are in sentence case, and every number carries its unit and, where it matters, its project stage.

## Motion

Ease in and out: cubic-bezier(0.2, 0, 0, 1). Fast 150ms, Base 300ms, Slow 500ms.

## Layout

The margin is 6% of the shortest side of the format. Inside it are six columns, with gutters half the size of the margin.
`;
}
