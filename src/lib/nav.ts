export type NavItem = {
  href: string;
  label: string;
};

export const nav: NavItem[] = [
  { href: "/", label: "Overview" },
  { href: "/color", label: "Color" },
  { href: "/typography", label: "Typography" },
  { href: "/visual-language", label: "Visual language" },
  { href: "/templates", label: "Templates" },
  { href: "/applications", label: "Applications" },
];

export function getPrevNext(pathname: string) {
  const index = nav.findIndex((item) => item.href === pathname);
  const prev = index > 0 ? nav[index - 1] : null;
  const next = index >= 0 && index < nav.length - 1 ? nav[index + 1] : null;
  return { prev, next };
}
