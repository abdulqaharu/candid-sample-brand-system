import { Artwork } from "@/components/ui/artwork";
import { InteractiveArt } from "./interactive-art";
import { ScaledCanvas } from "./scaled-canvas";

const tiles = [
  {
    art: (
      <Artwork
        name="equipment"
        width={1176}
        height={900}
        alt="Drafting illustration of a gas turbine, 13.2 m long, with its inlet, compressor, combustor and exhaust."
      />
    ),
    caption: "Equipment, drawn in the drafting style. For decks and documents.",
  },
  {
    art: (
      <Artwork
        name="process"
        width={1176}
        height={900}
        alt="Process illustration over 4 weeks: site, 12 options, quotes, stamped."
      />
    ),
    caption: "A process, step by step. For the website and decks.",
  },
  {
    art: (
      <ScaledCanvas
        width={392}
        height={300}
        label="Interactive illustration of a turbine in a browser window. The parts separate on hover."
      >
        <InteractiveArt />
      </ScaledCanvas>
    ),
    caption: "On the website, figures react to the pointer. Built with Hairline.",
  },
];

export function IllustrationTiles() {
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {tiles.map(({ art, caption }) => (
        <li key={caption} className="group">
          <figure>
            {art}
            <figcaption className="pt-3 text-[13px] text-ui-muted">{caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
