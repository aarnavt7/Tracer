import Image from "next/image";

import { siteConfig } from "@/config/site";

const maps = siteConfig.subsurfaceMapImages;

export function SubsurfaceMapImage() {
  return (
    <div className="grid w-full grid-cols-1 items-end gap-3 sm:gap-4 md:grid-cols-2 md:min-h-[200px] lg:min-h-[260px]">
      {maps.map((map) => (
        <div
          key={map.src}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
        >
          <Image
            src={map.src}
            alt={map.alt}
            fill
            className="object-cover object-left-bottom saturate-[0.88] contrast-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}
