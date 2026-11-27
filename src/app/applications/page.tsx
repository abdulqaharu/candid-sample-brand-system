import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { Artwork } from "@/components/ui/artwork";
import { EmailSignature } from "@/components/applications/email-signature";

export const metadata: Metadata = { title: "Applications" };

/**
 * Each mock-up is an image exported from the design at twice the size of its
 * 1200 wide stage. `height` is the image's own height.
 */
const applications = [
  {
    id: "website",
    title: "Website",
    description:
      "The homepage hero and the backtest section, built with the system. Drawings replace generic imagery, accuracy is shown per stage, and each reader gets their own way in.",
    alt: "Website mock-ups: the homepage hero and the backtest section.",
    height: 3809,
  },
  {
    id: "one-pager",
    title: "One-pager",
    description:
      "A leave-behind for sales and events: one big number, a short story, three stats and the plot plan. Light for print and PDF, Dark for screens.",
    alt: "The one-pager in Light and Dark, headed Concept to FID, in weeks, with the figure 4 weeks.",
    height: 1692,
  },
  {
    id: "pitch-deck",
    title: "Pitch deck",
    description:
      "Four layouts cover most sales and investor decks: open with one big number, prove it with a drawing, count the options, then show the deliverables.",
    alt: "Four slides: an opener, a proof chart showing ±15%, a count of 1 in 12 options and the deliverables.",
    height: 1584,
  },
  {
    id: "cover-sheet",
    title: "Deliverable cover sheet",
    description:
      "The front page of every stamped package. It names the project, the deliverable and the revision, and leaves room for the PE stamp. It sits on top of drawings made in the owner's own templates.",
    alt: "Cover sheet for deliverable D05, the plot plan, with its revisions and a space for the PE stamp.",
    height: 1610,
  },
  {
    id: "case-study",
    title: "Case study",
    description:
      "A page for proof, laid out like an article: the claim, the project in one product card, then the story. It can stay anonymous when a client prefers it.",
    alt: "Case study page: a 500 MW combined cycle, from site to stamped Pre-FEED in four weeks.",
    height: 2656,
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description:
      "A company banner, plus posters and ads for news and proof. Each leads with one image: a photo under a dot screen, a drawing, or a single big figure.",
    alt: "A LinkedIn banner and four posts: Built to be checked, a board decision ad, one model for site and market, and 350+ GW of experience.",
    height: 3769,
  },
  {
    id: "event-booth",
    title: "Event booth",
    description:
      "For trade shows like the EPC Show. A plant photo under a dot screen, one big claim and a single call to action.",
    alt: "An event backdrop reading Months of engineering, done in weeks, beside a roll-up banner.",
    height: 1346,
  },
  {
    id: "business-card",
    title: "Business card",
    description: "The dark card carries the mark, the light card carries the person. Shown stacked on the dot field.",
    alt: "Front and back of the business card on a field of dots.",
    height: 1602,
  },
  {
    id: "proposal-cover",
    title: "Proposal cover",
    description:
      "The first page a prospect sees. It names the client, the site and the stage, so every proposal feels prepared for them.",
    alt: "Proposal cover for Site A, a 2×1 combined cycle.",
    height: 1554,
  },
];

export default function ApplicationsPage() {
  return (
    <Shell pathname="/applications" title="Applications">
      {applications.map(({ id, title, description, alt, height }, index) => (
        <Section key={id} id={id} title={title} description={description} first={index === 0}>
          <Artwork name={id} width={2400} height={height} alt={alt} />
        </Section>
      ))}

      <Section
        id="email-signature"
        title="Email signature"
        description="One signature for everyone, drawn from the brand. Type your details into it, copy it, and paste it into Gmail, Outlook or Apple Mail."
      >
        <EmailSignature />
      </Section>
    </Shell>
  );
}
