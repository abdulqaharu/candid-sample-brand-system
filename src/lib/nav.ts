export type NavSection = { id: string; label: string };

export type NavItem = {
  href: string;
  label: string;
  sections: NavSection[];
};

export const nav: NavItem[] = [
  { href: "/", label: "Introduction", sections: [{ id: "who-we-are", label: "Who we are" }] },
  {
    href: "/strategy",
    label: "Strategy",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "mission", label: "Mission" },
      { id: "brand", label: "Brand" },
    ],
  },
  {
    href: "/color",
    label: "Color",
    sections: [
      { id: "palette", label: "Palette" },
      { id: "proportion", label: "Proportion" },
      { id: "combinations", label: "Combinations" },
      { id: "color-modes", label: "Color modes" },
    ],
  },
  {
    href: "/typography",
    label: "Typography",
    sections: [
      { id: "typeface", label: "Typeface" },
      { id: "try-it", label: "Try it" },
      { id: "hierarchy", label: "Hierarchy" },
    ],
  },
  {
    href: "/motion",
    label: "Motion",
    sections: [
      { id: "curve", label: "Curve" },
      { id: "in-use", label: "In use" },
    ],
  },
  { href: "/layout", label: "Layout", sections: [{ id: "grid", label: "Grid" }] },
  {
    href: "/imagery",
    label: "Imagery",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "principles", label: "Principles" },
      { id: "style", label: "Style" },
      { id: "treatment", label: "Treatment" },
    ],
  },
  {
    href: "/applications",
    label: "Applications",
    sections: [
      { id: "website", label: "Website" },
      { id: "one-pager", label: "One-pager" },
      { id: "pitch-deck", label: "Pitch deck" },
      { id: "cover-sheet", label: "Deliverable cover sheet" },
      { id: "case-study", label: "Case study" },
      { id: "linkedin", label: "LinkedIn" },
      { id: "event-booth", label: "Event booth" },
      { id: "business-card", label: "Business card" },
      { id: "proposal-cover", label: "Proposal cover" },
      { id: "email-signature", label: "Email signature" },
    ],
  },
  { href: "/resources", label: "Resources", sections: [{ id: "downloads", label: "Downloads" }] },
];

export function getPrevNext(pathname: string) {
  const index = nav.findIndex((item) => item.href === pathname);
  const prev = index > 0 ? nav[index - 1] : null;
  const next = index >= 0 && index < nav.length - 1 ? nav[index + 1] : null;
  return { prev, next };
}
