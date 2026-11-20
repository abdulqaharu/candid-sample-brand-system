import { SlideFrame } from "./slide-frame";

export function SlideTitle() {
  return (
    <SlideFrame caption="A &middot; Title. Grid background, one claim." slideNumber={1} blueprint>
      <div className="flex h-full flex-col justify-end gap-2">
        <p className="text-[9px] font-medium uppercase tracking-[0.04em] text-redline-text">
          Owner&rsquo;s engineering &middot; Gas-fired power
        </p>
        <p className="text-[22px] font-medium leading-tight text-fg">
          Concept to FID, in weeks.
        </p>
        <p className="text-[11px] text-fg-2">
          PE-stamped Pre-FEED and FEED packages for owners and developers.
        </p>
      </div>
    </SlideFrame>
  );
}
