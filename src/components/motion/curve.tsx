import { Asset } from "@/components/ui/asset";

const steps = Array.from({ length: 11 }, (_, i) => i * 4.4);

function Layer({ inset, children }: { inset: string; children: React.ReactNode }) {
  return (
    <div className="absolute" style={{ inset }}>
      {children}
    </div>
  );
}

const fill = "absolute inset-0 block size-full max-w-none";

export function Curve() {
  return (
    <div
      role="img"
      aria-label="Easing curve: a fast start that settles gently, cubic-bezier 0.2, 0, 0, 1."
      className="relative aspect-square w-full overflow-hidden"
    >
      {steps.map((step) => (
        <Layer key={`v${step}`} inset={`27.5% ${72 - step}% 28.5% ${28 + step}%`}>
          <div className="absolute inset-y-0 -inset-x-[1.35px]">
            <Asset name="51a1f.svg" width={3} height={238} className="block size-full max-w-none" />
          </div>
        </Layer>
      ))}
      {steps.map((step) => (
        <Layer key={`h${step}`} inset={`${71.5 - step}% 28% ${28.5 + step}% 28%`}>
          <div className="absolute inset-x-0 -inset-y-[1.35px]">
            <Asset name="981ff.svg" width={238} height={3} className="block size-full max-w-none" />
          </div>
        </Layer>
      ))}
      <Layer inset="71.5% 63.2% 28.5% 28%">
        <div className="absolute inset-x-0 -inset-y-[1.35px]">
          <Asset name="baac1.svg" width={48} height={3} className="block size-full max-w-none" />
        </div>
      </Layer>
      <Layer inset="27.5% 28% 72.5% 28%">
        <div className="absolute inset-x-0 -inset-y-[1.35px]">
          <Asset name="ec1db.svg" width={238} height={3} className="block size-full max-w-none" />
        </div>
      </Layer>
      <Layer inset="27.5% 28% 28.5% 28%">
        <div className="absolute inset-x-0 -inset-y-[0.85%]">
          <Asset name="dba6c.svg" width={238} height={242} className="block size-full max-w-none" />
        </div>
      </Layer>
      <Layer inset="71.03% 62.73% 28.03% 36.33%">
        <Asset name="98a4e.svg" width={5} height={5} className={fill} />
      </Layer>
      <Layer inset="27.03% 71.53% 72.03% 27.53%">
        <Asset name="029ad.svg" width={5} height={5} className={fill} />
      </Layer>
      {["70.44% 70.94% 27.44% 26.94%", "26.44% 26.94% 71.44% 70.94%"].map((inset) => (
        <div
          key={inset}
          className="absolute flex items-center justify-center"
          style={{ inset, containerType: "size" }}
        >
          <div className="h-[hypot(-50cqw,50cqh)] w-[hypot(50cqw,50cqh)] flex-none rotate-45">
            <div className="relative size-full">
              <Asset name="02036.svg" width={8} height={8} className={fill} />
            </div>
          </div>
        </div>
      ))}
      <Layer inset="70.57% 71.07% 27.57% 27.07%">
        <div className="absolute -inset-[7.5%]">
          <Asset name="2a12c.svg" width={12} height={12} className="block size-full max-w-none" />
        </div>
      </Layer>
    </div>
  );
}
