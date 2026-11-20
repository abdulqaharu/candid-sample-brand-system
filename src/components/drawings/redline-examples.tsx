function EquipmentRow({ highlights }: { highlights: ("none" | "redline")[] }) {
  return (
    <svg viewBox="0 0 320 90" className="h-[90px] w-full" role="presentation">
      {highlights.map((state, i) => (
        <rect
          key={i}
          x={20 + i * 100}
          y="15"
          width="70"
          height="60"
          fill="var(--bg-surface)"
          stroke={state === "redline" ? "var(--accent-redline)" : "var(--accent-draft)"}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function RedlineDo() {
  return (
    <div className="rounded-[2px] border border-line bg-surface p-6">
      <span className="inline-flex items-center rounded-full border border-verified px-3 py-1 text-label text-verified">
        Do
      </span>
      <div className="relative mt-4">
        <EquipmentRow highlights={["none", "none", "none"]} />
        <svg viewBox="0 0 320 90" className="absolute inset-0 h-[90px] w-full">
          <ellipse
            cx="155"
            cy="45"
            rx="75"
            ry="38"
            fill="none"
            stroke="var(--accent-redline)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        </svg>
      </div>
      <p className="mt-3 font-mono text-label-mono text-redline-text">&minus;$4.2M &middot; REV B</p>
      <p className="mt-3 text-body-s text-fg-2">One callout. The reader knows exactly where to look.</p>
    </div>
  );
}

export function RedlineDont() {
  return (
    <div className="rounded-[2px] border border-line bg-surface p-6">
      <span className="inline-flex items-center rounded-full border border-redline px-3 py-1 text-label text-redline-text">
        Don&rsquo;t
      </span>
      <div className="mt-4">
        <EquipmentRow highlights={["none", "redline", "redline"]} />
      </div>
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-label-mono text-redline-text">
        <span>New</span>
        <span>Updated</span>
        <span>Revised</span>
        <span>!! See note</span>
      </div>
      <p className="mt-3 text-body-s text-fg-2">
        Everything is red, so nothing stands out, and it reads as an error.
      </p>
    </div>
  );
}
