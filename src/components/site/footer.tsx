import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M14 1.5L25.26 7.75V20.25L14 26.5L2.74 20.25V7.75L14 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-foreground/40"
              />
              <path
                d="M14 6L21.5 10.25V18.75L14 23L6.5 18.75V10.25L14 6Z"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/60"
              />
              <circle cx="14" cy="14.5" r="3" fill="currentColor" className="text-primary/80" />
            </svg>
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
