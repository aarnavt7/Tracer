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
                <li key={supporter}>
                  <span className="inline-flex min-w-20 items-center justify-center rounded-full border border-border bg-card/40 px-4 py-2 font-heading text-sm font-semibold tracking-tight text-foreground/80">
                    {supporter}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l border-border pl-8 lg:pl-10">
            <span className="inline-flex rounded-md border border-foreground/25 bg-card/60 px-4 py-2 font-heading text-xs font-medium tracking-wide text-foreground">
              {partnerships.backer}
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
