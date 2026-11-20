const points: [number, number][] = [
  [20, 175], [45, 150], [60, 140], [80, 120], [95, 105], [115, 90], [130, 80],
  [148, 65], [162, 52], [178, 40], [95, 115], [128, 72], [60, 148], [145, 60],
];

export function Scatter() {
  return (
    <svg
      viewBox="0 0 190 190"
      className="h-[170px] w-full"
      role="img"
      aria-label="Scatter chart of estimate versus actual installed cost across fourteen built plants, all close to the diagonal line of perfect agreement."
    >
      <line x1="10" y1="180" x2="10" y2="10" stroke="var(--border-strong)" strokeWidth="1" />
      <line x1="10" y1="180" x2="185" y2="180" stroke="var(--border-strong)" strokeWidth="1" />
      <line
        x1="10"
        y1="180"
        x2="185"
        y2="5"
        stroke="var(--text-muted)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="var(--accent-draft)" />
      ))}
    </svg>
  );
}
