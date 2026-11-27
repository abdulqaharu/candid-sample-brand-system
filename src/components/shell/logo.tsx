import Link from "next/link";
import { Asset } from "@/components/ui/asset";

export function Logo({ className }: { className: string }) {
  return (
    <Link
      href="/"
      aria-label="Candid, introduction"
      className={`relative block shrink-0 overflow-hidden ${className}`}
    >
      <Asset
        name="6e1f2.png"
        width={1024}
        height={1024}
        className="absolute top-[-17.8%] left-[-21.21%] h-[140.2%] w-[146.82%] max-w-none"
      />
    </Link>
  );
}
