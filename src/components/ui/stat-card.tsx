import { Card } from "./card";
import { Eyebrow } from "./eyebrow";

export function StatCard({
  eyebrow,
  value,
  caption,
  accent = false,
}: {
  eyebrow: string;
  value: string;
  caption: string;
  accent?: boolean;
}) {
  return (
    <Card>
      <div className={`h-0.5 w-12 ${accent ? "bg-redline" : "bg-draft"}`} />
      <Eyebrow variant={accent ? "redline" : "muted"} className="mt-4">
        {eyebrow}
      </Eyebrow>
      <p className={`mt-2 text-stat font-medium ${accent ? "text-redline-text" : "text-fg"}`}>
        {value}
      </p>
      <p className="mt-2 text-body-m text-fg-2">{caption}</p>
    </Card>
  );
}
