export type Primitive = {
  name: string;
  token: string;
  hex: string;
  note?: string;
};

export const inkPrimitives: Primitive[] = [
  { name: "Ink 950", token: "ink-950", hex: "#0A0A0A", note: "Text" },
  { name: "Ink 900", token: "ink-900", hex: "#111111" },
  { name: "Ink 850", token: "ink-850", hex: "#171717" },
  { name: "Ink 800", token: "ink-800", hex: "#1F1F1F" },
  { name: "Ink 700", token: "ink-700", hex: "#2B2B2B" },
  { name: "Ink 600", token: "ink-600", hex: "#3D3D3B" },
  { name: "Ink 500", token: "ink-500", hex: "#5E5E5A" },
  { name: "Ink 400", token: "ink-400", hex: "#8A8A85" },
  { name: "Ink 300", token: "ink-300", hex: "#B4B4AE" },
];

export const inkSwatches: Primitive[] = [
  inkPrimitives[0],
  inkPrimitives[1],
  inkPrimitives[3],
  inkPrimitives[4],
  inkPrimitives[6],
  inkPrimitives[8],
];

export const paperPrimitives: Primitive[] = [
  { name: "Paper 200", token: "paper-200", hex: "#DCDCD5" },
  { name: "Paper 100", token: "paper-100", hex: "#ECECE6" },
  { name: "Paper 50", token: "paper-50", hex: "#F6F6F2", note: "Canvas" },
];

export const signalPrimitives: Primitive[] = [
  { name: "Redline", token: "redline-500", hex: "#F2542D" },
  { name: "Redline 600", token: "redline-600", hex: "#C8401C" },
  { name: "Redline light", token: "redline-400", hex: "#FF7A57" },
  { name: "Redline tint", token: "redline-100", hex: "#FDE3DA" },
  { name: "Draft 600", token: "draft-600", hex: "#3566C8" },
  { name: "Draft", token: "draft-500", hex: "#5B8DEF" },
  { name: "Draft light", token: "draft-300", hex: "#9DBBF7" },
  { name: "Stamp 600", token: "stamp-600", hex: "#177A45" },
  { name: "Stamp", token: "stamp-500", hex: "#2FBF71" },
];

export type SemanticToken = {
  token: string;
  tailwind: string;
  light: string;
  dark: string;
  use: string;
};

export const semanticTokens: SemanticToken[] = [
  { token: "bg/canvas", tailwind: "canvas", light: "paper-50", dark: "ink-950", use: "Page and slide background" },
  { token: "bg/surface", tailwind: "surface", light: "paper-100", dark: "ink-900", use: "Cards, panels, sidebar, title band" },
  { token: "bg/raised", tailwind: "raised", light: "paper-200", dark: "ink-800", use: "Hover, selected, inputs, switcher track" },
  { token: "border/default", tailwind: "line", light: "paper-200", dark: "ink-700", use: "Hairlines and dividers" },
  { token: "border/strong", tailwind: "line-strong", light: "ink-300", dark: "ink-600", use: "Outlined buttons, chips, table chip outlines" },
  { token: "text/primary", tailwind: "fg", light: "ink-950", dark: "paper-50", use: "Headings and body" },
  { token: "text/secondary", tailwind: "fg-2", light: "ink-600", dark: "ink-300", use: "Supporting copy" },
  { token: "text/muted", tailwind: "fg-3", light: "ink-500", dark: "ink-500", use: "Captions, metadata" },
  { token: "text/redline", tailwind: "redline-text", light: "redline-600", dark: "redline-500", use: "Red text: eyebrows, links, callout labels" },
  { token: "accent/redline", tailwind: "redline", light: "redline-500", dark: "redline-500", use: "One key action or callout per view" },
  { token: "accent/draft", tailwind: "draft", light: "draft-600", dark: "draft-300", use: "Drawing linework, charts, data" },
  { token: "status/verified", tailwind: "verified", light: "stamp-600", dark: "stamp-500", use: "PE-stamped, verified, on track" },
];

export const primitiveHex: Record<string, string> = {
  "ink-950": "#0A0A0A",
  "ink-900": "#111111",
  "ink-850": "#171717",
  "ink-800": "#1F1F1F",
  "ink-700": "#2B2B2B",
  "ink-600": "#3D3D3B",
  "ink-500": "#5E5E5A",
  "ink-400": "#8A8A85",
  "ink-300": "#B4B4AE",
  "paper-200": "#DCDCD5",
  "paper-100": "#ECECE6",
  "paper-50": "#F6F6F2",
  "redline-600": "#C8401C",
  "redline-500": "#F2542D",
  "redline-400": "#FF7A57",
  "redline-100": "#FDE3DA",
  "draft-600": "#3566C8",
  "draft-500": "#5B8DEF",
  "draft-300": "#9DBBF7",
  "stamp-600": "#177A45",
  "stamp-500": "#2FBF71",
};

export type TypeScaleRow = {
  name: string;
  tailwind: string;
  spec: string;
  sample: string;
  mono?: boolean;
  upper?: boolean;
};

export const typeScale: TypeScaleRow[] = [
  { name: "Display XL", tailwind: "text-display-xl", spec: "144 / 92%  -4%  MEDIUM", sample: "±15%" },
  { name: "Display L", tailwind: "text-display-l", spec: "96 / 98%  -3%  MEDIUM", sample: "Concept to FID." },
  { name: "Heading H1", tailwind: "text-h1", spec: "56 / 105%  -2%  MEDIUM", sample: "Pre-FEED in 4 weeks." },
  { name: "Heading H2", tailwind: "text-h2", spec: "36 / 115%  -1.5%  MEDIUM", sample: "Backtested against built plants." },
  { name: "Heading H3", tailwind: "text-h3", spec: "24 / 125%  -0.5%  MEDIUM", sample: "PE-stamped, in your format" },
  { name: "Body L", tailwind: "text-body-l", spec: "20 / 150%  -0.2%  REGULAR", sample: "Software evaluates 12 configurations for your site. Engineers take the best one to the next gate." },
  { name: "Body M", tailwind: "text-body-m", spec: "16 / 155%  REGULAR", sample: "Vendor quotes and lead times keep cost and schedule current, right up to delivery." },
  { name: "Body S", tailwind: "text-body-s", spec: "14 / 150%  REGULAR", sample: "Estimate accuracy depends on stage. Class 4 at Pre-FEED, Class 3 at FEED." },
  { name: "Label", tailwind: "text-label", spec: "12 / 140%  +4%  MEDIUM  UPPER", sample: "Why Candid · How it works · The package", upper: true },
  { name: "Label Mono", tailwind: "text-label-mono", spec: "12 / 140%  +8%  MEDIUM  UPPER", sample: "D05 plot plan · Rev B · Site A", mono: true, upper: true },
  { name: "Code Mono", tailwind: "text-code", spec: "14 / 150%  REGULAR", sample: "HRSG duty 412.6 MMBtu/hr · GT 2 × 7HA.02", mono: true },
  { name: "Data Stat", tailwind: "text-stat", spec: "64 / 100%  -3%  MEDIUM", sample: "350+ GW" },
];
