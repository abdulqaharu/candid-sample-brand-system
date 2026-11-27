import Link from "next/link";
import Image from "next/image";

export function Logo({ className }: { className: string }) {
  return (
    <Link
      href="/"
      aria-label="Candid, introduction"
      // The first-visit intro lands its mark exactly here.
      data-brand-mark
      className={`block shrink-0 ${className}`}
    >
      <Image src="/brand/candid-mark.svg" alt="" width={62} height={65} unoptimized className="size-full" />
    </Link>
  );
}
