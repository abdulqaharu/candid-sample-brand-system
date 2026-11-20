import { SlideFrame } from "./slide-frame";

const stats = [
  { value: "4 wks", label: "Pre-FEED", caption: "Concept to a stamped package", accent: false },
  { value: "12 wks", label: "FEED", caption: "Ready for EPC bids", accent: false },
  { value: "±15%", label: "Backtested", caption: "Against 14 built plants", accent: true },
];

export function SlideProof() {
  return (
    <SlideFrame caption="B &middot; Proof. Three stats, one in Redline." slideNumber={2}>
      <div className="flex h-full flex-col gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-fg-3">Why Candid</p>
        <p className="text-[18px] font-medium leading-tight text-fg">Faster, and it holds up.</p>
        <div className="mt-1 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className={`h-[2px] w-6 ${stat.accent ? "bg-redline" : "bg-draft"}`} />
              <p className={`mt-1.5 text-[18px] font-medium ${stat.accent ? "text-redline-text" : "text-fg"}`}>
                {stat.value}
              </p>
              <p className="text-[9px] uppercase tracking-[0.04em] text-fg-3">{stat.label}</p>
              <p className="mt-0.5 text-[9px] text-fg-2">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
