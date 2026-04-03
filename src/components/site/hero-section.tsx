"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

import { siteConfig } from "@/config/site";

const RoverScene = dynamic(
  () => import("./rover-scene").then((mod) => ({ default: mod.RoverScene })),
  { ssr: false },
);

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden">
      {/* Precision grid background */}
      <div className="pointer-events-none absolute inset-0 mesh-background opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      {/* Bottom edge fade — clean transition into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* 3D Rover Scene */}
      <div className="absolute inset-0 top-[5vh] z-0">
        <RoverScene />
      </div>

      {/* Upper-center scrim: separates headline from busy 3D / orange grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-0 h-[min(58vh,520px)] bg-[radial-gradient(ellipse_78%_88%_at_50%_16%,oklch(0.055_0.022_260/0.78)_0%,oklch(0.075_0.018_260/0.42)_42%,transparent_76%)]" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-16 text-center lg:px-10">
        {/* Main headline */}
        <motion.h1
          className="mt-4 font-heading text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0, 1] }}
        >
          <span className="block text-gradient">
            {siteConfig.hero.headline[0]}
          </span>
          <span className="block text-foreground/90 [text-shadow:0_2px_28px_oklch(0.06_0.02_260/0.95),0_1px_3px_oklch(0.04_0.02_260/0.85)]">
            {siteConfig.hero.headline[1]}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {siteConfig.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.65_0.18_50_/_0.3)]"
          >
            {siteConfig.hero.primaryCta}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#technology"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3 text-sm font-medium text-foreground transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
          >
            {siteConfig.hero.secondaryCta}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
