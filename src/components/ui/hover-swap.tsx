import { Asset } from "./asset";

const motions = {
  left: ["group-hover:-translate-x-full", "left-full top-0"],
  right: ["group-hover:translate-x-full", "-left-full top-0"],
  down: ["group-hover:translate-y-full", "left-0 -top-full"],
  diagonal: ["group-hover:translate-x-full group-hover:-translate-y-full", "-left-full top-full"],
};

/** An icon that slides out on hover while a copy slides in. The parent needs `group`. */
export function HoverSwap({
  name,
  size,
  box = size,
  direction,
}: {
  name: string;
  size: number;
  box?: number;
  direction: keyof typeof motions;
}) {
  const [move, offset] = motions[direction];
  return (
    <span aria-hidden className="relative block shrink-0 overflow-hidden" style={{ width: box, height: box }}>
      <span
        className={`absolute inset-0 transition-transform duration-300 motion-reduce:transform-none motion-reduce:transition-none ${move}`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <Asset name={name} width={size} height={size} />
        </span>
        <span className={`absolute flex size-full items-center justify-center ${offset}`}>
          <Asset name={name} width={size} height={size} />
        </span>
      </span>
    </span>
  );
}
