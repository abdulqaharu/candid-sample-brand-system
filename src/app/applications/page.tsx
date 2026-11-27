import type { Metadata } from "next";
import { Shell } from "@/components/shell/shell";
import { Section } from "@/components/ui/section";
import { EmailSignature } from "@/components/applications/email-signature";

export const metadata: Metadata = { title: "Applications" };

export default function ApplicationsPage() {
  return (
    <Shell pathname="/applications" title="Applications">
      <Section
        id="email-signature"
        title="Email signature"
        first
        description="One signature for everyone, drawn from the brand. Type your details into it, copy it, and paste it into Gmail, Outlook or Apple Mail."
      >
        <EmailSignature />
      </Section>
    </Shell>
  );
}
