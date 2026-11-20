import Link from "next/link";
import { getPrevNext, nav } from "@/lib/nav";

export function PageFooter({ pathname }: { pathname: string }) {
  const { prev, next } = getPrevNext(pathname);
  const isLast = pathname === nav[nav.length - 1].href;
  const nextItem = isLast ? { href: nav[0].href, label: "Back to overview" } : next;

  return (
    <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-3 bg-surface px-5 py-8 text-fg hover:text-redline-text focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-10"
        >
          <span aria-hidden>&larr;</span>
          <span>
            <span className="block text-label text-fg-3">Previous</span>
            <span className="text-[22px]">{prev.label}</span>
          </span>
        </Link>
      ) : (
        <div className="bg-surface px-5 py-8 sm:px-10" />
      )}
      {nextItem ? (
        <Link
          href={nextItem.href}
          className="flex items-center justify-between gap-3 bg-raised px-5 py-8 text-fg hover:text-redline-text focus-visible:outline-draft focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-10"
        >
          <span>
            <span className="block text-label text-fg-3">Next</span>
            <span className="text-[22px]">{nextItem.label}</span>
          </span>
          <span aria-hidden>&rarr;</span>
        </Link>
      ) : (
        <div className="bg-raised px-5 py-8 sm:px-10" />
      )}
    </div>
  );
}
