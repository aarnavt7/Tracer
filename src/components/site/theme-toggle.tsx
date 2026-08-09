"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "eratos-theme";

function appliedTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(appliedTheme());
  }, []);

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  function toggleTheme() {
    const nextTheme = appliedTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The theme still applies for this visit when storage is unavailable.
    }
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/50 text-foreground transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {theme === "dark" ? (
        <Sun aria-hidden className="size-4" />
      ) : (
        <Moon aria-hidden className="size-4" />
      )}
    </button>
  );
}
