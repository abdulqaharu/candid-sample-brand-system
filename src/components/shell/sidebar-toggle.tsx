"use client";

import { setCollapsed } from "@/lib/sidebar-state";
import { Asset } from "@/components/ui/asset";

/** Switches the sidebar, then keeps keyboard focus on the button that replaces this one. */
function toggle(collapse: boolean) {
  setCollapsed(collapse);
  requestAnimationFrame(() => {
    document
      .querySelector<HTMLElement>(`[data-sidebar-toggle="${collapse ? "expand" : "collapse"}"]`)
      ?.focus();
  });
}

// The icon is one drawing, so it is shown twice: once with a hole where the
// chevron is, and once clipped to the chevron, which can then move by itself.
const WITHOUT_CHEVRON =
  "[clip-path:polygon(evenodd,0_0,100%_0,100%_100%,0_100%,0_0,40%_28%,40%_72%,75%_72%,75%_28%,40%_28%)]";
const CHEVRON_ONLY = "[clip-path:inset(28%_25%_28%_40%)]";
/** On hover or focus the chevron leans toward the divider, the way the sidebar will go. */
const LEAN =
  "transition-[translate] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-x-[1.25px] group-focus-visible:-translate-x-[1.25px] motion-reduce:translate-none motion-reduce:transition-none";

export function CollapseButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      data-sidebar-toggle="collapse"
      onClick={() => toggle(true)}
      aria-label="Collapse sidebar"
      className={`group flex size-7 cursor-pointer items-center justify-center rounded-md ${className}`}
    >
      <span aria-hidden className="relative block size-4.5">
        <span
          className="absolute inset-[8.33%_8.46%_8.33%_8.2%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.477px_-1.5px] mask-size-[18px_18px]"
          style={{ maskImage: 'url("/brand/78b25.svg")' }}
        >
          <span className="absolute inset-[-5%]">
            {[WITHOUT_CHEVRON, `${CHEVRON_ONLY} ${LEAN}`].map((layer) => (
              <Asset
                key={layer}
                name="c0bb1.svg"
                width={17}
                height={17}
                className={`absolute inset-0 block size-full max-w-none ${layer}`}
              />
            ))}
          </span>
        </span>
      </span>
    </button>
  );
}

/** This icon's chevron is a cut-out, so the whole icon leans the way the sidebar will go. */
const LEAN_OUT =
  "transition-[translate] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px] motion-reduce:translate-none motion-reduce:transition-none";

export function ExpandButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      data-sidebar-toggle="expand"
      onClick={() => toggle(false)}
      aria-label="Expand sidebar"
      className={`group flex h-9 w-7 cursor-pointer items-center justify-center rounded-md ${className}`}
    >
      <span aria-hidden className="relative block size-4.5">
        {/* Mirrored, as in the design. */}
        <Asset
          name="e7166.svg"
          width={15}
          height={15}
          className={`absolute top-[1.5px] left-[1.5px] -scale-x-100 ${LEAN_OUT}`}
        />
      </span>
    </button>
  );
}
