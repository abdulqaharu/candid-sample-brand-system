import Image from "next/image";

/** A static design asset from public/brand. Sizes are the file's own dimensions. */
export function Asset({
  name,
  width,
  height,
  className,
}: {
  name: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image src={`/brand/${name}`} alt="" width={width} height={height} className={className} unoptimized />
  );
}
