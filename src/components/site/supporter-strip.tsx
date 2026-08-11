"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { siteConfig } from "@/config/site";

const { partnerships } = siteConfig;

export function SupporterStrip() {
  return (
    <section
      aria-label="Backers and partners"
      className="relative border-y border-border"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <motion.div
          className="mx-auto flex w-full max-w-[16rem] items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
        >
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-transparent to-border"
          />
          <p className="whitespace-nowrap font-heading text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground">
            {partnerships.label}
          </p>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent to-border"
          />
        </motion.div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-9 lg:gap-x-[4.5rem]">
          {partnerships.backers.map((backer, i) => (
            <motion.li
              key={backer.name}
              className="flex items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.11,
                ease: [0.25, 0.1, 0, 1],
              }}
            >
              <Image
                src={backer.src}
                alt={backer.name}
                width={backer.width}
                height={backer.height}
                className="supporter-logo w-auto"
                style={{ height: backer.displayHeight }}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
