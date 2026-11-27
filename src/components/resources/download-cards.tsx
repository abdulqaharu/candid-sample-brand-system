"use client";

import type { ReactNode } from "react";
import { brandFile, paletteFile } from "@/lib/brand-file";
import { Asset } from "@/components/ui/asset";
import { HoverSwap } from "@/components/ui/hover-swap";

// TODO: add the link to the Figma templates file. The "Open" action stays hidden until it is set.
const TEMPLATES_URL: string | null = null;

const action =
  "group inline-flex cursor-pointer items-center gap-1.5 self-start border-b border-ui-underline pb-0.5 text-base leading-5 tracking-[-0.015em]";

function save(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Card({
  icon,
  title,
  detail,
  children,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  children?: ReactNode;
}) {
  return (
    <li className="flex min-h-57 flex-col justify-between gap-8 rounded-lg bg-ui-panel p-5">
      <div>
        <div aria-hidden className="flex h-8 items-center">
          {icon}
        </div>
        <h3 className="pt-6 text-base leading-[1.35] tracking-[-0.015em]">{title}</h3>
        <p className="text-base leading-[1.35] tracking-[-0.015em] text-ui-muted">{detail}</p>
      </div>
      {children}
    </li>
  );
}

function Download({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={`Download ${title}`} className={action}>
      Download
      <HoverSwap name="234f4.svg" size={14} box={16} direction="down" />
    </button>
  );
}

function External({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={action}>
      {label}
      <HoverSwap name="53f6a.svg" size={14} box={16} direction="diagonal" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function DownloadCards() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      <Card
        title="Color palette"
        detail="9 colors"
        icon={["bg-brand-redline", "bg-brand-ink", "bg-brand-draft-600", "bg-brand-draft-300"].map((color) => (
          <span key={color} className={`-ml-1.5 size-6 rounded-full border-2 border-ui-panel first:ml-0 ${color}`} />
        ))}
      >
        <Download title="color palette" onClick={() => save("candid-color-palette.txt", paletteFile())} />
      </Card>
      <Card
        title="Geist"
        detail="Primary"
        icon={<span className="text-[28px] leading-7 font-medium tracking-[-0.04em]">Aa</span>}
      >
        <External href="https://fonts.google.com/specimen/Geist" label="Google Fonts" />
      </Card>
      <Card
        title="Brand file for AI"
        detail="Markdown, for any AI tool"
        icon={
          <span className="flex flex-col gap-1.25">
            <span className="h-0.75 w-7 rounded-full bg-ui-text" />
            <span className="h-0.75 w-10 rounded-full bg-ui-text" />
            <span className="h-0.75 w-5 rounded-full bg-ui-text" />
          </span>
        }
      >
        <Download title="brand file for AI" onClick={() => save("candid-brand.md", brandFile())} />
      </Card>
      <Card
        title="Templates"
        detail="Decks and one-pagers, in Figma"
        icon={<Asset name="4d5ea.svg" width={17} height={25} />}
      >
        {TEMPLATES_URL && <External href={TEMPLATES_URL} label="Open" />}
      </Card>
    </ul>
  );
}
