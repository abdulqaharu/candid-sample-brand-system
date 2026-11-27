export type PaletteColor = {
  name: string;
  hex: string;
  /** Background and label classes for the swatch. */
  className: string;
};

export const palette = {
  redline: { name: "Redline", hex: "#F2542D", className: "bg-brand-redline text-ui-white" },
  ink: { name: "Ink", hex: "#0A0A0A", className: "bg-brand-ink text-ui-white" },
  draft: { name: "Draft", hex: "#3566C8", className: "bg-brand-draft-600 text-ui-text" },
  draftLight: { name: "Draft light", hex: "#9DBBF7", className: "bg-brand-draft-300 text-ui-text" },
  paper: { name: "Paper", hex: "#F6F6F2", className: "bg-brand-paper text-ui-text" },
  redlineDark: { name: "Redline dark", hex: "#C8401C", className: "bg-brand-redline-600 text-ui-text" },
  stamp: { name: "Stamp", hex: "#177A45", className: "bg-brand-stamp-600 text-ui-white" },
  ink500: { name: "Ink 500", hex: "#5E5E5A", className: "bg-brand-ink-500 text-ui-white" },
  paper200: { name: "Paper 200", hex: "#DCDCD5", className: "bg-brand-paper-200 text-ui-text" },
} satisfies Record<string, PaletteColor>;

export const paletteList: PaletteColor[] = Object.values(palette);

export type ColorFormat = "HEX" | "RGB" | "CMYK";

export function formatColor(hex: string, format: ColorFormat) {
  if (format === "HEX") return hex;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  if (format === "RGB") return `${r}, ${g}, ${b}`;
  // Arithmetic conversion, not a print profile. Confirm CMYK values with the printer.
  const k = 1 - Math.max(r, g, b) / 255;
  const channel = (v: number) => (k === 1 ? 0 : Math.round(((1 - v / 255 - k) / (1 - k)) * 100));
  return `${channel(r)}, ${channel(g)}, ${channel(b)}, ${Math.round(k * 100)}`;
}
