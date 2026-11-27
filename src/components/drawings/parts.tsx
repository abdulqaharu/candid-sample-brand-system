import type { ReactNode } from "react";
import { Asset } from "@/components/ui/asset";

/**
 * A line asset placed by the box it occupies in the design.
 * Rotated lines are centered in that box, then turned.
 */
export function Line({
  src,
  box: [x, y, w, h],
  length = w,
  rotate = 0,
  stroke = 1,
}: {
  src: string;
  box: [number, number, number, number];
  length?: number;
  rotate?: number;
  stroke?: number;
}) {
  return (
    <div
      className="absolute h-0"
      style={{
        left: x + w / 2 - length / 2,
        top: y + h / 2,
        width: length,
        transformOrigin: "50% 0",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      <div className="absolute inset-x-0 bottom-0" style={{ top: -stroke }}>
        <Asset name={src} width={Math.round(length)} height={Math.ceil(stroke)} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

export function Sprite({
  src,
  x,
  y,
  w,
  h = w,
}: {
  src: string;
  x: number;
  y: number;
  w: number;
  h?: number;
}) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      <Asset name={src} width={Math.round(w)} height={Math.round(h)} className="absolute inset-0 block size-full max-w-none" />
    </div>
  );
}

export function Text({
  x,
  y,
  className,
  children,
}: {
  x: number;
  y: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <p className={`absolute leading-[normal] whitespace-pre ${className}`} style={{ left: x, top: y }}>
      {children}
    </p>
  );
}

export function Box({
  x,
  y,
  w,
  h,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className: string;
}) {
  return <div className={`absolute ${className}`} style={{ left: x, top: y, width: w, height: h }} />;
}
