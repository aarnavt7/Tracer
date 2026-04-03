"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contactHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Tracer by Eratos Robotics — Inquiry",
  )}`;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-background/80 backdrop-blur-2xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M14 1.5L25.26 7.75V20.25L14 26.5L2.74 20.25V7.75L14 1.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-foreground/60"
            />
            <path
              d="M14 6L21.5 10.25V18.75L14 23L6.5 18.75V10.25L14 6Z"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/80"
            />
            <circle cx="14" cy="14.5" r="3" fill="currentColor" className="text-primary" />
          </svg>
          <span className="hidden flex-col sm:flex">
            <span className="font-heading text-sm font-medium uppercase tracking-[0.22em] text-foreground">
              {siteConfig.name}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contactHref}
            className="rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/10"
          >
            Talk to us
          </a>
        </nav>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-background/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-4">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={contactHref}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground"
            >
              Talk to us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
