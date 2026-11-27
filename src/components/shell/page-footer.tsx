import Link from "next/link";
import { getPrevNext } from "@/lib/nav";
import { HoverSwap } from "@/components/ui/hover-swap";

const cell = "flex min-h-34 flex-col justify-between px-5 py-7 sm:px-10";
const label = "text-[22px] leading-[1.2] tracking-[-0.03em]";

export function PageFooter({ pathname }: { pathname: string }) {
  const { prev, next } = getPrevNext(pathname);

  return (
    <nav aria-label="Previous and next page" className="grid grid-cols-2">
      {prev ? (
        <Link href={prev.href} rel="prev" className={`group bg-ui-prev ${cell}`}>
          <span className={label}>{prev.label}</span>
          <HoverSwap name="f1d0b.svg" size={18} direction="left" />
        </Link>
      ) : (
        <div className={`bg-ui-prev ${cell}`} />
      )}
      {next ? (
        <Link href={next.href} rel="next" className={`group bg-ui-next ${cell}`}>
          <span className={label}>{next.label}</span>
          <HoverSwap name="279a2.svg" size={18} direction="right" />
        </Link>
      ) : (
        <div className={`bg-ui-next ${cell}`} />
      )}
    </nav>
  );
}
