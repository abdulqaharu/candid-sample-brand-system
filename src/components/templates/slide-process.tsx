import { SlideFrame } from "./slide-frame";

const steps = [
  { num: "01", title: "Your constraints", caption: "Site, interconnection, turbines", verified: false },
  { num: "02", title: "12 scenarios", caption: "Software tests every option", verified: false },
  { num: "03", title: "Live quotes", caption: "Cost and lead times stay current", verified: false },
  { num: "04", title: "PE-stamped", caption: "Delivered in your format", verified: true },
];

export function SlideProcess() {
  return (
    <SlideFrame caption="C &middot; Process. Four steps on a timeline." slideNumber={3}>
      <div className="flex h-full flex-col gap-3">
        <p className="text-[9px] font-medium uppercase tracking-[0.04em] text-fg-3">How it works</p>
        <p className="text-[18px] font-medium leading-tight text-fg">
          From constraints to a stamped package.
        </p>
        <div className="relative mt-2">
          <div className="absolute left-0 right-0 top-[4px] h-px bg-line-strong" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-start" style={{ width: "23%" }}>
                <span
                  className={`h-2 w-2 rounded-full ${step.verified ? "bg-verified" : "bg-draft"}`}
                />
                <p className="mt-1.5 text-[9px] text-fg-3">{step.num}</p>
                <p className="text-[10px] font-medium text-fg">{step.title}</p>
                <p className="text-[8px] text-fg-2">{step.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
