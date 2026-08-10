"use client";

import { useEffect, useRef } from "react";

import { siteConfig } from "@/config/site";

const { demoVideo } = siteConfig;

export function DemoVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().catch(() => {});
  }, []);

  return (
    <div
      role="region"
      aria-label="Tracer demo video"
      className="relative overflow-hidden rounded-3xl border border-border bg-card/40 shadow-[inset_0_1px_0_0_var(--inset-highlight)]"
    >
      <div className="relative aspect-[16/10] w-full">
        <video
          ref={videoRef}
          src={demoVideo.src}
          className="h-full w-full object-cover saturate-[0.88] contrast-[1.06]"
          playsInline
          muted
          loop
          autoPlay
          controls={false}
          disablePictureInPicture
          aria-label={`${demoVideo.overlayTitle}. ${demoVideo.overlayCaption}`}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-background via-background/20 to-background/50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
          <p className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
            {demoVideo.overlayEyebrow}
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {demoVideo.overlayTitle}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {demoVideo.overlayCaption}
          </p>
        </div>
      </div>
    </div>
  );
}
