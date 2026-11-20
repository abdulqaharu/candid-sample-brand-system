"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const labelProps = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

export function PlotPlan({
  animate = false,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldAnimate = animate && !reduced;
  const drawn = !shouldAnimate || inView;

  const equipment = [
    { x: 160, y: 140, w: 160, h: 90, label: "GT-1  7HA.02" },
    { x: 160, y: 330, w: 160, h: 90, label: "GT-2  7HA.02" },
    { x: 360, y: 140, w: 150, h: 90, label: "HRSG-1" },
    { x: 360, y: 330, w: 150, h: 90, label: "HRSG-2" },
    { x: 610, y: 230, w: 130, h: 120, label: "ST-1" },
  ];

  const fanCircles = [600, 650, 700, 750, 800];

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Plot plan drawing of a gas-fired power plant: two gas turbines and heat recovery steam generators feeding a steam turbine, an air-cooled condenser, a switchyard, and a revision callout marking a twenty foot change in turbine spacing."
    >
      <rect x="0" y="0" width="1200" height="640" fill="var(--bg-canvas)" />
      <g stroke="var(--grid-minor)" strokeWidth="1">
        {Array.from({ length: 30 }, (_, i) => i * 40).map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="640" />
        ))}
        {Array.from({ length: 16 }, (_, i) => i * 40).map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
        ))}
      </g>

      <rect
        x="60"
        y="60"
        width="820"
        height="520"
        fill="none"
        stroke="var(--line-drawing)"
        strokeWidth="1"
        strokeDasharray="10 6"
      />
      <text x="72" y="40" {...labelProps} fill="var(--text-muted)">
        Site A &middot; Property line
      </text>

      {equipment.map((box) => (
        <motion.rect
          key={box.label}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          fill="var(--bg-surface)"
          stroke="var(--accent-draft)"
          strokeWidth="2"
          initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={drawn ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        />
      ))}
      {equipment.map((box) => (
        <text
          key={`${box.label}-label`}
          x={box.x + 12}
          y={box.y + 22}
          {...labelProps}
          fill="var(--text-primary)"
          opacity={drawn ? 1 : 0}
          style={{ transition: "opacity 0.3s ease 0.6s" }}
        >
          {box.label}
        </text>
      ))}

      <circle cx="545" cy="185" r="16" fill="none" stroke="var(--accent-draft)" strokeWidth="1" />
      <circle cx="545" cy="375" r="16" fill="none" stroke="var(--accent-draft)" strokeWidth="1" />

      <rect
        x="560"
        y="460"
        width="280"
        height="80"
        fill="none"
        stroke="var(--accent-draft)"
        strokeWidth="2"
      />
      {fanCircles.map((x) => (
        <circle key={x} cx={x} cy="500" r="16" fill="none" stroke="var(--accent-draft)" strokeWidth="1" />
      ))}
      <text x="560" y="558" {...labelProps} fill="var(--text-muted)">
        ACC &middot; 5 cells
      </text>

      <rect
        x="760"
        y="90"
        width="100"
        height="120"
        fill="none"
        stroke="var(--accent-draft)"
        strokeWidth="2"
      />
      {[780, 800, 820, 840].map((x) => (
        <line key={x} x1={x} y1="90" x2={x} y2="210" stroke="var(--accent-draft)" strokeWidth="1" />
      ))}
      <text x="760" y="226" {...labelProps} fill="var(--text-muted)">
        Switchyard &middot; 345 kV
      </text>

      <g stroke="var(--accent-draft)" strokeWidth="1" fill="none">
        <line x1="320" y1="185" x2="360" y2="185" />
        <line x1="320" y1="375" x2="360" y2="375" />
        <line x1="510" y1="185" x2="529" y2="185" />
        <line x1="510" y1="375" x2="529" y2="375" />
      </g>
      <g stroke="var(--accent-draft)" strokeWidth="1" strokeDasharray="4 4" fill="none">
        <path d="M545 201 V260 H610" />
        <path d="M545 391 V320 H610" />
        <path d="M740 290 H780 V210" />
      </g>

      <path
        d="M60 470 H240 L300 330 L360 330"
        fill="none"
        stroke="var(--accent-draft)"
        strokeWidth="2"
        strokeDasharray="14 6"
      />
      <text x="70" y="490" {...labelProps} fill="var(--text-muted)">
        Gas lateral &middot; 4.1 mi
      </text>

      <g stroke="var(--text-secondary)" strokeWidth="1" fill="none">
        <line x1="60" y1="605" x2="880" y2="605" />
        <line x1="60" y1="598" x2="60" y2="612" />
        <line x1="880" y1="598" x2="880" y2="612" />
      </g>
      <text x="470" y="598" textAnchor="middle" {...labelProps} fill="var(--text-secondary)">
        1,240 ft
      </text>

      <g>
        <circle cx="960" cy="110" r="26" fill="none" stroke="var(--text-muted)" strokeWidth="1" />
        <path d="M960 128 V92" stroke="var(--text-primary)" strokeWidth="2" markerEnd="url(#plot-plan-arrow)" />
        <text x="960" y="78" textAnchor="middle" {...labelProps} fill="var(--text-primary)">
          N
        </text>
      </g>
      <defs>
        <marker id="plot-plan-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--text-primary)" />
        </marker>
      </defs>

      <motion.ellipse
        cx="240"
        cy="280"
        rx="120"
        ry="55"
        fill="none"
        stroke="var(--accent-redline)"
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={shouldAnimate ? { opacity: 0 } : undefined}
        animate={drawn ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: shouldAnimate ? 0.9 : 0 }}
      />
      <g opacity={drawn ? 1 : 0} style={{ transition: "opacity 0.4s ease 0.9s" }}>
        <path d="M410 235 l10 -17 l10 17 Z" fill="var(--accent-redline)" />
        <text x="420" y="233" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="10" fill="var(--text-on-accent)">
          B
        </text>
        <text x="440" y="222" {...labelProps} fill="var(--text-redline)">
          Rev B: GT spacing +20 ft
        </text>
      </g>

      <g>
        <rect
          x="920"
          y="400"
          width="240"
          height="200"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="1"
        />
        {[440, 480, 520, 560].map((y) => (
          <line key={y} x1="920" y1={y} x2="1160" y2={y} stroke="var(--border-strong)" strokeWidth="1" />
        ))}
        <text x="932" y="430" fontFamily="var(--font-sans)" fontSize="18" fontWeight={600} fill="var(--text-primary)">
          Candid
        </text>
        <text x="932" y="466" {...labelProps} fill="var(--text-primary)">
          D05 Plot plan
        </text>
        <text x="932" y="506" {...labelProps} fill="var(--text-primary)">
          Site A &middot; 2x1 CC
        </text>
        <text x="932" y="546" {...labelProps} fill="var(--text-primary)">
          Scale 1:1000 &middot; Rev B
        </text>
        <text x="932" y="586" {...labelProps} fill="var(--status-verified)">
          PE stamped &middot; Nov 2026
        </text>
      </g>
    </svg>
  );
}
