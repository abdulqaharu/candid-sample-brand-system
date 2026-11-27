import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { DownloadCards } from "@/components/resources/download-cards";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <Shell pathname="/resources" title="Resources">
      <section id="downloads" aria-labelledby="downloads-title" className="grid gap-6 py-12 md:grid-cols-2 md:py-19">
        <h2 id="downloads-title" className="text-2xl leading-[1.2] font-medium tracking-[-0.025em]">
          Downloads
        </h2>
        <DownloadCards />
      </section>
    </Shell>
  );
}
