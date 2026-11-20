export function AnnotationAnatomy() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_260px]">
      <svg
        viewBox="0 0 760 300"
        className="h-[300px] w-full rounded-[2px] bg-blueprint"
        role="img"
        aria-label="Diagram showing how Candid labels equipment on a drawing: the name sits inside the box, a leader line runs from a dot on the edge to a bent elbow, and the label gives the value and unit first."
      >
        <rect
          x="80"
          y="110"
          width="140"
          height="80"
          fill="var(--bg-surface)"
          stroke="var(--accent-draft)"
          strokeWidth="2"
        />
        <text
          x="92"
          y="134"
          fontFamily="var(--font-geist-mono)"
          fontSize="12"
          letterSpacing="0.08em"
          style={{ textTransform: "uppercase" }}
          fill="var(--text-primary)"
        >
          HRSG-1
        </text>
        <circle cx="220" cy="150" r="4" fill="var(--text-secondary)" />
        <path
          d="M220 150 H320 L365 105"
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth="1"
        />
        <text
          x="370"
          y="100"
          fontFamily="var(--font-geist-mono)"
          fontSize="12"
          letterSpacing="0.08em"
          style={{ textTransform: "uppercase" }}
          fill="var(--text-primary)"
        >
          Duty 412.6 MMBtu/hr
        </text>
        <text
          x="370"
          y="120"
          fontFamily="var(--font-geist-mono)"
          fontSize="12"
          letterSpacing="0.08em"
          style={{ textTransform: "uppercase" }}
          fill="var(--text-muted)"
        >
          Supplementary firing &middot; off
        </text>

        <circle cx="130" cy="130" r="10" fill="var(--accent-redline)" />
        <text x="130" y="134" textAnchor="middle" fontSize="12" fill="var(--text-on-accent)">1</text>

        <circle cx="220" cy="150" r="10" fill="var(--accent-redline)" opacity="0" />
        <circle cx="265" cy="150" r="10" fill="var(--accent-redline)" />
        <text x="265" y="154" textAnchor="middle" fontSize="12" fill="var(--text-on-accent)">2</text>

        <circle cx="400" cy="100" r="10" fill="var(--accent-redline)" />
        <text x="400" y="104" textAnchor="middle" fontSize="12" fill="var(--text-on-accent)">3</text>
      </svg>
      <ol className="flex flex-col gap-4">
        <li className="flex gap-3">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-redline text-[12px] text-on-accent">1</span>
          <p className="text-body-s text-fg-2">Name sits inside the object, top-left, 12px in.</p>
        </li>
        <li className="flex gap-3">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-redline text-[12px] text-on-accent">2</span>
          <p className="text-body-s text-fg-2">Leader: 1px, starts on a 4px dot, one bend at 45&deg;.</p>
        </li>
        <li className="flex gap-3">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-redline text-[12px] text-on-accent">3</span>
          <p className="text-body-s text-fg-2">Value first, unit always. Second line for context.</p>
        </li>
      </ol>
    </div>
  );
}
