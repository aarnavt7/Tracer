import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
              <span className="font-heading text-[10px] font-bold tracking-[0.15em] text-primary">
                ER
              </span>
            </span>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
