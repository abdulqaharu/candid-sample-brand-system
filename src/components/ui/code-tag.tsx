export function CodeTag({ code, name }: { code: string; name: string }) {
  return (
    <span className="inline-flex items-stretch overflow-hidden rounded-[2px] border border-line-strong">
      <span className="flex items-center bg-raised px-2.5 py-1.5 font-mono text-label-mono text-redline-text">
        {code}
      </span>
      <span className="flex items-center px-2.5 py-1.5 font-mono text-label-mono uppercase text-fg">
        {name}
      </span>
    </span>
  );
}
