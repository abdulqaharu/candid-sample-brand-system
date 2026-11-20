export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[2px] border border-line-strong px-3 py-2 text-body-s text-fg">
      {children}
      <span className="text-fg-3" aria-hidden>
        &rarr;
      </span>
    </span>
  );
}
