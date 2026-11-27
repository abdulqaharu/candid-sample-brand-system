import Image from "next/image";

/**
 * A still mock-up exported from the design, from public/artwork. It is served as
 * exported: running small type through the image optimiser would soften it.
 */
export function Artwork({
  name,
  width,
  height,
  alt,
}: {
  name: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image src={`/artwork/${name}.webp`} alt={alt} width={width} height={height} unoptimized className="block h-auto w-full" />
  );
}
