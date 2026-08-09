import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import Script from "next/script";

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

const themeScript = `
  (() => {
    const root = document.documentElement;
    try {
      const storedTheme = localStorage.getItem("eratos-theme");
      const theme = storedTheme === "light" ? "light" : "dark";
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
    } catch {
      root.dataset.theme = "dark";
      root.style.colorScheme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "Tracer by Eratos Robotics — Subsurface Intelligence",
    template: "%s | Eratos Robotics",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
      data-theme="dark"
      suppressHydrationWarning
      style={{ colorScheme: "dark" }}
      className={`scroll-smooth ${bodyFont.variable} ${headingFont.variable}`}
    >
      <body>
        <Script id="eratos-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
