import Image from "next/image";

export function ArtSectionTransition({
  src,
  objectPosition = "center",
}: {
  src: string;
  objectPosition?: string;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-[2] h-0">
      <div
        className="oldart-transition-media absolute inset-x-[4%] -top-8 h-16 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="92vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}

export default ArtSectionTransition;
