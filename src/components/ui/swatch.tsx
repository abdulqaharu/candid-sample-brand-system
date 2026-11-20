import type { Primitive } from "@/lib/tokens";

export function Swatch({ item, height }: { item: Primitive; height: number }) {
  return (
    <div className="overflow-hidden rounded-[2px] border border-line">
      <div style={{ height, backgroundColor: item.hex }} />
      <div className="bg-surface p-3">
        <p className="text-[16px] font-medium text-fg">
          {item.note ? `${item.name}, ${item.note.toLowerCase()}` : item.name}
        </p>
        <p className="mt-1 font-mono text-code text-fg-3">
          {item.hex} &middot; {item.token}
        </p>
      </div>
    </div>
  );
}
