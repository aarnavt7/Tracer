import Image from "next/image";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/animated-section";
import { SectionHeading } from "@/components/site/section-heading";
import { siteConfig } from "@/config/site";

const { team } = siteConfig;

export function TeamSection() {
  return (
    <section id="team" className="relative py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection>
          <SectionHeading eyebrow={team.eyebrow} title={team.title} />
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => (
            <StaggerItem key={member.name}>
              <article className="h-full overflow-hidden rounded-2xl border border-border bg-card/40">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-card/70">
                  {member.image ? (
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      className="scale-[1.14] object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Portrait placeholder for ${member.name}`}
                      className="flex h-full items-center justify-center bg-gradient-to-br from-card to-muted"
                    >
                      <span className="font-heading text-5xl font-semibold tracking-tight text-foreground/35">
                        {member.initials}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-heading text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
