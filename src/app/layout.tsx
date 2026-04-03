import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";

import { SmoothScroll } from "@/components/site/smooth-scroll";

import "./globals.css";

const bodyFont = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tracer by Eratos Robotics — Subsurface Intelligence",
    template: "%s | Eratos Robotics",
  },
  description:
    "Tracer is an autonomous rover that generates high-trust subsurface utility maps before excavation. Built by Eratos Robotics for SUE firms and contractors.",
  applicationName: "Eratos Robotics",
  keywords: [
    "Eratos Robotics",
    "Tracer",
    "subsurface utility engineering",
    "GPR",
    "underground mapping",
    "autonomous rover",
    "utility detection",
    "SUE",
    "construction robotics",
  ],
  openGraph: {
    title: "Tracer by Eratos Robotics - Subsurface Intelligence",
    description:
      "Autonomous pre-dig subsurface intelligence for private-site excavation. Stop digging blind.",
    type: "website",
    url: "https://eratosrobotics.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracer by Eratos Robotics",
    description:
      "Autonomous pre-dig subsurface intelligence for private-site excavation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${bodyFont.variable} ${headingFont.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
