"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

const AUTO_MS = 7500;

const slides = siteConfig.productMedia;

export function ProductMediaShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const slide = slides[active]!;

  const go = useCallback((i: number) => {
    setActive((i + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Tracer in the field and deliverable maps"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!regionRef.current?.contains(next)) setPaused(false);
      }}
      className="outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Segmented tabs */}
      <div
        role="tablist"
        aria-label="Select slide"
        className="mb-6 flex flex-wrap justify-center gap-1 sm:justify-start"
      >
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            id={`product-media-tab-${i}`}
            aria-selected={active === i}
            aria-controls="product-media-panel"
            tabIndex={0}
            onClick={() => setActive(i)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors sm:text-xs ${
              active === i
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
            }`}
          >
            {s.eyebrow}
          </button>
        ))}
      </div>

      <div
        id="product-media-panel"
        role="tabpanel"
        aria-labelledby={`product-media-tab-${active}`}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      >
        <div className="relative aspect-[16/10] w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={`${slide.title}. ${slide.caption}`}
                fill
                className="object-cover saturate-[0.88] contrast-[1.06]"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Vignette + bottom read legibility */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-background via-background/20 to-background/50"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent"
            aria-hidden
          />

          {/* Copy overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
            <p className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
              {slide.eyebrow}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
              {slide.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {slide.caption}
            </p>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="mt-5 flex justify-center gap-2 sm:justify-start"
        role="group"
        aria-label="Slide indicators"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active === i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              active === i
                ? "w-6 bg-primary"
                : "w-1.5 bg-white/20 hover:bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
