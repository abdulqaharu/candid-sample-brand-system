import { SlideFrame } from "./slide-frame";

const items = [
  { code: "D04", name: "Heat balance" },
  { code: "D05", name: "Plot plan" },
  { code: "D06", name: "Single-line" },
  { code: "D16", name: "CAPEX" },
  { code: "D17", name: "Schedule" },
];

export function SlideDeliverables() {
  return (
    <SlideFrame caption="D &middot; Deliverables. Codes beside a drawing." slideNumber={4}>
      <div className="flex h-full gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-fg-3">The package</p>
          <p className="text-[16px] font-medium leading-tight text-fg">
            What you take to your board.
          </p>
          <ul className="mt-1 flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.code} className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-redline-text">{item.code}</span>
                <span className="text-[9px] text-fg-2">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-[34%] flex-col justify-between rounded-[2px] border border-line-strong bg-blueprint p-2">
          <div className="flex h-full items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-5 w-5 border-2 border-draft" />
            ))}
          </div>
          <p className="text-center font-mono text-[8px] uppercase tracking-[0.08em] text-fg-3">
            D05 Plot plan
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}
