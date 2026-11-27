import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Zoomable } from "@/components/drawings/zoomable";
import { IllustrationTiles } from "@/components/drawings/illustration-tiles";
import { Figures } from "@/components/hairline/figures";
import { Artwork } from "@/components/ui/artwork";

export const metadata: Metadata = { title: "Imagery" };

/** Style examples, exported from the design at about twice their size on the page. */
const pairs = [
  [
    { name: "turbine-hall", label: "Linework of a turbine hall: the unit, its crane rail and lift clearance" },
    { name: "switchyard", label: "Linework of a switchyard: a 345 kV bus with four bays and their breakers" },
  ],
  [
    { name: "drawing-markup", label: "Photo of a hand marking up a drawing with a pencil" },
    { name: "site-crew", label: "Photo of two engineers walking across a construction site" },
  ],
];

const treatment = [
  {
    aspect: "Photos",
    guidance:
      "Monochrome or slightly desaturated, with fine corner marks like a framed drawing. Darken the area where text or linework sits.",
  },
  {
    aspect: "Linework on photos",
    guidance: "1 px lines in Paper on dark photos, short sentence-case labels, and nothing in colour.",
  },
];

export default function ImageryPage() {
  return (
    <Shell pathname="/imagery" title="Imagery">
      <section id="overview" aria-labelledby="overview-title" className="py-12 md:py-19">
        <Reveal>
          <h2 id="overview-title" className="text-[13px] tracking-[-0.01em] text-ui-text-2">
            Overview
          </h2>
          <p className="max-w-[900px] pt-5 text-2xl leading-[1.28] tracking-[-0.025em] md:text-3xl">
            Photos show the real thing. Linework explains it. Candid&apos;s imagery puts real plants, sites and
            people next to the drawings we make, and often marks up one with the other, the way an engineer
            would.
          </p>
        </Reveal>
      </section>

      <Section
        id="principles"
        title="Principles"
        description="Real, technical and human. Three kinds of image: photos with linework on top, drawings on their own, and photos of real people and sites."
      />

      <Section
        id="style"
        title="Style"
        description="Lead with photos marked up with linework: a few outlines, one dimension and short labels. Use drawings alone for diagrams and decks, and photos alone for people and culture."
      >
        <div className="flex flex-col gap-2">
          <Zoomable label="Photo with linework, plant">
            <Artwork name="plant" width={2400} height={1200} alt="Photo of a plant with linework marking three stacks" />
          </Zoomable>
          {pairs.map((pair) => (
            <div key={pair[0].name} className="grid gap-2 sm:grid-cols-2">
              {pair.map(({ name, label }) => (
                <Zoomable key={name} label={label}>
                  <Artwork name={name} width={1192} height={795} alt={label} />
                </Zoomable>
              ))}
            </div>
          ))}
          <Zoomable label="Drawing only, plot plan">
            <Artwork name="plot-plan" width={2400} height={1200} alt="Plot plan drawing on a dark ground" />
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
        id="figures"
        title="Figures"
        description="For hero moments and the website, equipment is drawn as a Hairline figure: rounded solids in one thin line, with one bright edge to show where to look. On the website, the figure answers the pointer."
      >
        <Figures />
      </Section>

      <Section
        id="sources"
        title="Where they come from"
        description="Plotter's drafting grammar sets the rules for how every illustration looks. Hairline (MIT licensed) draws the interactive versions for the website. Every Candid subject, like a turbine or a site, is drawn custom so it is specific to our work."
      />

      <Section
        id="treatment"
        title="Treatment"
        description="Photos are slightly desaturated and cool-neutral, so they sit well with Paper and Ink. Linework on top stays light and sparse, so the photo still does the talking."
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
