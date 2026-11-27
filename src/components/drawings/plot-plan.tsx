const mono = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.08em",
  xmlSpace: "preserve" as const,
};

const equipment = [
  { x: 160, y: 140, w: 160, h: 90, label: "GT-1  7HA.02" },
  { x: 160, y: 330, w: 160, h: 90, label: "GT-2  7HA.02" },
  { x: 360, y: 140, w: 150, h: 90, label: "HRSG-1" },
  { x: 360, y: 330, w: 150, h: 90, label: "HRSG-2" },
  { x: 610, y: 230, w: 130, h: 120, label: "ST-1" },
];

const titleRows = [
  { y: 487, text: "D05  PLOT PLAN", fill: "var(--text-primary)" },
  { y: 525, text: "SITE A  ·  2×1 CC", fill: "var(--text-muted)" },
  { y: 563, text: "SCALE 1:1000  ·  REV B", fill: "var(--text-muted)" },
  { y: 601, text: "PE STAMPED  ·  NOV 2026", fill: "var(--status-verified)" },
];

export function PlotPlan({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Plot plan drawing of a gas-fired power plant: two gas turbines and heat recovery steam generators feeding a steam turbine, an air-cooled condenser, a switchyard, and a revision callout marking a twenty foot change in turbine spacing."
    >
      <rect width="1200" height="640" fill="var(--bg-canvas)" />
      <g stroke="var(--grid-minor)" strokeWidth="1">
        {Array.from({ length: 31 }, (_, i) => i * 40).map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="640" />
        ))}
        {Array.from({ length: 17 }, (_, i) => i * 40).map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
        ))}
      </g>

      <rect x="60" y="60" width="820" height="520" fill="none" stroke="var(--line-drawing)" strokeDasharray="10 6" />
      <text x="72" y="53" {...mono} fill="var(--text-muted)">
        SITE A  ·  PROPERTY LINE
      </text>

      <g fill="var(--bg-surface)" stroke="var(--accent-draft)" strokeWidth="2">
        {equipment.map((box) => (
          <rect key={box.label} x={box.x} y={box.y} width={box.w} height={box.h} />
        ))}
        <rect x="560" y="460" width="280" height="80" />
        <rect x="760" y="90" width="100" height="120" />
      </g>
      {equipment.map((box) => (
        <text key={box.label} x={box.x + 12} y={box.y + 25} {...mono} fill="var(--text-primary)">
          {box.label}
        </text>
      ))}

      <g fill="none" stroke="var(--accent-draft)">
        {[185, 375].map((y) => (
          <circle key={y} cx="545" cy={y} r="16" />
        ))}
        {[600, 650, 700, 750, 800].map((x) => (
          <circle key={x} cx={x} cy="500" r="16" />
        ))}
        {[780, 800, 820, 840].map((x) => (
          <line key={x} x1={x} y1="100" x2={x} y2="200" />
        ))}
        <path d="M320 185H360 M320 375H360 M510 185H529 M510 375H529 M740 290H810V210" />
        <path d="M510 215L610 260 M510 345L610 320" strokeDasharray="4 4" />
        <path d="M0 470H240V420" strokeWidth="2" strokeDasharray="14 6" />
      </g>
      <g {...mono} fill="var(--text-muted)">
        <text x="560" y="565">ACC  ·  5 CELLS</text>
        <text x="760" y="233">SWITCHYARD  345 KV</text>
        <text x="72" y="493">GAS LATERAL  ·  4.1 MI</text>
      </g>

      <path d="M60 605H880 M60 597V613 M880 597V613" stroke="var(--text-muted)" />
      <text x="470" y="601" textAnchor="middle" {...mono} fill="var(--text-secondary)">
        1,240 FT
      </text>

      <circle cx="960" cy="110" r="26" fill="none" stroke="var(--text-muted)" />
      <path d="M960 128V88" stroke="var(--text-primary)" strokeWidth="2" />
      <text x="960" y="75" textAnchor="middle" {...mono} fill="var(--text-primary)">
        N
      </text>

      <ellipse
        cx="240"
        cy="280"
        rx="119"
        ry="54"
        fill="none"
        stroke="var(--accent-redline)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <path d="M370 284L382 264L394 284Z" fill="var(--accent-redline)" />
      <text x="382" y="282" textAnchor="middle" {...mono} fontSize={10} letterSpacing="0" fill="var(--text-on-accent)">
        B
      </text>
      <text x="404" y="283" {...mono} fill="var(--text-redline)">
        REV B: GT SPACING +20 FT
      </text>

      <rect x="920" y="412" width="240" height="203" fill="var(--bg-surface)" stroke="var(--border-strong)" />
      <path d="M920 463H1160 M920 501H1160 M920 539H1160 M920 577H1160" stroke="var(--border-strong)" />
      <text x="933" y="446" fontFamily="var(--font-geist-sans)" fontSize="24" fontWeight="500" fill="var(--text-primary)">
        Candid
      </text>
      {titleRows.map((row) => (
        <text key={row.text} x="933" y={row.y} {...mono} fill={row.fill}>
          {row.text}
        </text>
      ))}
    </svg>
  );
}
