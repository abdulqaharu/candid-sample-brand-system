import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { ScaledCanvas } from "@/components/drawings/scaled-canvas";
import { Zoomable } from "@/components/drawings/zoomable";
import { PlotPlan } from "@/components/drawings/plot-plan";
import { IllustrationTiles } from "@/components/drawings/illustration-tiles";
import {
  DrawingTag,
  PeoplePhoto,
  PlantPhoto,
  SwitchyardPhoto,
  TurbinePhoto,
} from "@/components/drawings/photo-tiles";

export const metadata: Metadata = { title: "Imagery" };

const pairs = [
  [
    { label: "Photo with linework, turbine hall", art: <TurbinePhoto /> },
    { label: "Photo with linework, switchyard", art: <SwitchyardPhoto /> },
  ],
  [
    {
      label: "Photo only, engineers",
      art: <PeoplePhoto note="Replace with photo: engineers reviewing a drawing" noteX={250} />,
    },
    {
      label: "Photo only, site crew",
      art: <PeoplePhoto note="Replace with photo: crew on a construction site" noteX={271} />,
    },
  ],
];

const treatment = [
  {
    aspect: "Photos",
    guidance: "Slightly desaturated and warm. Darken the area where text or linework sits, for contrast.",
  },
  {
    aspect: "Linework on photos",
    guidance: "1 to 2 px lines in Paper or Draft light, mono labels, and one Redline callout at most.",
  },
];

export default function ImageryPage() {
  return (
    <Shell pathname="/imagery" title="Imagery">
      <section id="overview" aria-labelledby="overview-title" className="py-12 md:py-19">
        <h2 id="overview-title" className="text-[13px] tracking-[-0.01em] text-ui-text-2">
          Overview
        </h2>
        <p className="max-w-[900px] pt-5 text-2xl leading-[1.28] tracking-[-0.025em] md:text-3xl">
          Photos show the real thing. Linework explains it. Candid&apos;s imagery puts real plants, sites and
          people next to the drawings we make, and often marks up one with the other, the way an engineer
          would.
        </p>
      </section>

      <Section
        id="principles"
        title="Principles"
        description="Real, technical and human. Three kinds of image: photos with linework on top, drawings on their own, and photos of real people and sites."
      />

      <Section
        id="style"
        title="Style"
        description="Lead with photos marked up with linework: outlines, labels and one Redline callout. Use drawings alone for diagrams and decks, and photos alone for people and culture. Avoid generic office stock."
      >
        <div className="flex flex-col gap-2">
          <Zoomable label="Photo with linework, plant">
            <ScaledCanvas width={1200} height={600}>
              <PlantPhoto />
            </ScaledCanvas>
          </Zoomable>
          {pairs.map((pair) => (
            <div key={pair[0].label} className="grid gap-2 sm:grid-cols-2">
              {pair.map((tile) => (
                <Zoomable key={tile.label} label={tile.label}>
                  <ScaledCanvas width={596} height={397}>
                    {tile.art}
                  </ScaledCanvas>
                </Zoomable>
              ))}
            </div>
          ))}
          <Zoomable label="Drawing only, D05 plot plan">
            <ScaledCanvas width={1200} height={600}>
              <div data-theme="dark" className="absolute -top-5 left-0 w-[1200px]">
                <PlotPlan className="block w-full" />
              </div>
              <DrawingTag />
            </ScaledCanvas>
          </Zoomable>
        </div>
      </Section>

      <Section
        id="illustration"
        title="Illustration"
        description="For ideas a photo cannot show, like a process or a scenario, we use thin-line technical illustrations. They follow the same drafting rules as our drawings: a defined role for each line, dimensions and plain labels."
      >
        <IllustrationTiles />
      </Section>

      <Section
        id="sources"
        title="Where they come from"
        description="Plotter's drafting grammar sets the rules for how every illustration looks. Hairline (MIT licensed) draws the interactive versions for the website. Every Candid subject, like a turbine or a site, is drawn custom so it is specific to our work."
      />

      <Section
        id="treatment"
        title="Treatment"
        description="Photos are slightly desaturated and warm, so they sit well with Paper and Ink. Linework on top stays light and sparse, so the photo still does the talking."
        aside={
          <table className="mt-10 w-full table-fixed text-left text-[15px] leading-[1.45] tracking-[-0.015em]">
            <thead>
              <tr className="tracking-[-0.02em]">
                <th scope="col" className="pr-6 pb-3 font-semibold">
                  Aspect
                </th>
                <th scope="col" className="pb-3 font-semibold">
                  Guidance
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              {treatment.map((row) => (
                <tr key={row.aspect}>
                  <th scope="row" className="py-3 pr-6 font-normal">
                    {row.aspect}
                  </th>
                  <td className="py-3 text-ui-text-2">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      />
    </Shell>
  );
}
