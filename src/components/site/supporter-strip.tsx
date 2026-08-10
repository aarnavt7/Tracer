import Image from "next/image";

import { siteConfig } from "@/config/site";

const { partnerships } = siteConfig;

export function SupporterStrip() {
  return (
    <section
      aria-label="Eratos supporters, backer, and design partner"
      className="relative border-y border-border"
    >
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-10">
        <div className="grid min-w-[780px] grid-cols-[1.4fr_1fr_1.2fr] items-center gap-8 py-7 lg:min-w-0 lg:gap-10">
          <div className="flex items-center gap-6">
            <p className="shrink-0 font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Supported by
            </p>
            <ul className="flex flex-1 items-center justify-between gap-3">
              {partnerships.supporters.map((supporter) => (
                <li
                  key={supporter.name}
                  className="flex min-w-24 justify-center"
                >
                  <Image
                    src={supporter.image.src}
                    alt={supporter.image.alt}
                    width={supporter.image.width}
                    height={supporter.image.height}
                    className="supporter-logo h-auto max-h-10 w-auto max-w-32 object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l border-border pl-8 lg:pl-10">
            <span className="inline-flex rounded-md border border-foreground/25 bg-card/60 px-4 py-2">
              <Image
                src={partnerships.backer.image.src}
                alt={partnerships.backer.image.alt}
                width={partnerships.backer.image.width}
                height={partnerships.backer.image.height}
                className="supporter-logo h-auto max-h-12 w-auto max-w-44 object-contain"
              />
            </span>
          </div>

          <div className="border-l border-border pl-8 lg:pl-10">
            <p className="font-heading text-sm font-medium tracking-tight text-foreground/80">
              {partnerships.designPartner}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
