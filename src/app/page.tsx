import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock,
  Cpu,
  EyeOff,
  FileCheck2,
  FileOutput,
  Layers,
  MapPin,
  Navigation,
  Radio,
  RotateCw,
  Scan,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/animated-section";
import { Footer } from "@/components/site/footer";
import { HeroSection } from "@/components/site/hero-section";
import { Navbar } from "@/components/site/navbar";
import { SectionHeading } from "@/components/site/section-heading";
import { UndergroundViz } from "@/components/site/underground-viz";
import { siteConfig } from "@/config/site";

const PROBLEM_ICONS = [EyeOff, Clock, AlertTriangle];
const STEP_ICONS = [Scan, Layers, Target, FileOutput];
const BENEFIT_ICONS = [Zap, RotateCw, Cpu, FileCheck2];
const TECH_ICONS = [Radio, Activity, MapPin, Cpu, ShieldCheck, Navigation];

export default function Home() {
  const contactHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Tracer by Eratos Robotics — Demo Request",
  )}`;

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── PROBLEM ──────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection>
            <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-primary">
              The problem
            </p>
            <h2 className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.problem.statement}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {siteConfig.problem.description}
            </p>
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
            {siteConfig.problem.cards.map((card, i) => {
              const Icon = PROBLEM_ICONS[i];
              return (
                <StaggerItem key={card.title}>
                  <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-medium text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section id="solution" className="relative py-24 lg:py-32">
        {/* Subtle divider glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow={siteConfig.howItWorks.eyebrow}
              title={siteConfig.howItWorks.title}
            />
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteConfig.howItWorks.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <StaggerItem key={step.number}>
                  <div className="relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-3xl font-bold text-primary/30">
                        {step.number}
                      </span>
                      <Icon className="size-5 text-primary/60" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── PRODUCT VISUALIZATION ────────────────────────── */}
      <section className="relative py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection className="text-center">
            <SectionHeading
              eyebrow="Subsurface visualization"
              title="See what's underground before the first bucket drops."
              description="Tracer fuses GPR, EMI, and precision positioning to build a spatially registered map of buried utilities — color-coded by type, scored by confidence."
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection className="mt-16" delay={0.2}>
            <UndergroundViz />
          </AnimatedSection>

          {/* Stat callouts */}
          <StaggerContainer className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "QL-B", label: "quality-level data" },
              { value: "±5cm", label: "horizontal accuracy" },
              { value: "5×", label: "faster than manual" },
              { value: "CAD/BIM", label: "ready outputs" },
            ].map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-gradient sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── BENEFITS ─────────────────────────────────────── */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow={siteConfig.benefits.eyebrow}
              title={siteConfig.benefits.title}
              description="Tracer is a force multiplier for SUE firms and contractors — not a replacement. It handles the repetitive fieldwork so your experts focus on judgment."
            />
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2">
            {siteConfig.benefits.items.map((item, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <StaggerItem key={item.title}>
                  <div className="group flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TECHNOLOGY ───────────────────────────────────── */}
      <section id="technology" className="relative py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Background grid accent */}
        <div className="pointer-events-none absolute inset-0 mesh-background opacity-15 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_50%,black,transparent)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow={siteConfig.technology.eyebrow}
              title={siteConfig.technology.title}
              description="Each layer of Tracer's sensing, positioning, and AI stack is purpose-built for subsurface utility intelligence."
              align="center"
            />
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.technology.items.map((item, i) => {
              const Icon = TECH_ICONS[i];
              return (
                <StaggerItem key={item.title}>
                  <div className="h-full border-b border-r border-white/[0.04] bg-background p-7 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.02] md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0">
                    <Icon className="size-5 text-primary" />
                    <h3 className="mt-4 font-heading text-base font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────── */}
      <section id="contact" className="relative py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Atmospheric backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection className="flex flex-col items-center text-center">
            <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Get started
            </p>
            <h2 className="mt-6 max-w-3xl font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {siteConfig.cta.headline}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {siteConfig.cta.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={contactHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.65_0.18_50_/_0.3)]"
              >
                {siteConfig.cta.buttonText}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#technology"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                Review the platform
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
