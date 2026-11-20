const zones = [
  { label: "1  Header · Logo, doc code", top: 0, height: 7 },
  { label: "2  Claim · Display + lead", top: 9, height: 16 },
  { label: "3  Proof · Three stat cards", top: 27, height: 12 },
  { label: "4  Process · Four steps", top: 41, height: 14 },
  { label: "5  Drawing · D05 excerpt", top: 57, height: 26 },
  { label: "6  CTA + contact", top: 85, height: 13 },
];

export function OnePagerGrid() {
  return (
    <div
      className="relative mx-auto w-full max-w-[476px] overflow-hidden rounded-[2px] border border-line bg-canvas"
      style={{ aspectRatio: "476 / 616" }}
      role="img"
      aria-label="US Letter one-pager wireframe showing twelve faint columns and six zones: header, claim, proof, process, drawing, and call to action."
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex-1 border-x border-redline/[0.07]" />
        ))}
      </div>
      {zones.map((zone) => (
        <div
          key={zone.label}
          className="absolute left-[7%] right-[7%] flex items-center justify-center border border-dashed border-draft/60 px-2 text-center"
          style={{ top: `${zone.top}%`, height: `${zone.height}%` }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-fg-3">
            {zone.label}
          </p>
        </div>
      ))}
    </div>
  );
}
