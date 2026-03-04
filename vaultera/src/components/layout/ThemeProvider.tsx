"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");

      // Background system
      root.style.setProperty("--bg-primary", "#F4F7FF");
      root.style.setProperty("--bg-surface", "#FFFFFF");
      root.style.setProperty("--bg-surface-alt", "#EEF2FF");
      root.style.setProperty("--bg-card", "rgba(15,23,42,0.04)");
      root.style.setProperty("--bg-card-hover", "rgba(15,23,42,0.08)");
      root.style.setProperty("--navbar-bg", "rgba(255,255,255,0.85)");

      // Borders
      root.style.setProperty("--border", "rgba(15,23,42,0.08)");
      root.style.setProperty("--border-hover", "rgba(15,23,42,0.15)");

      // Text
      root.style.setProperty("--text-primary", "#0F172A");
      root.style.setProperty("--text-secondary", "#334155");
      root.style.setProperty("--text-muted", "#64748B");
      root.style.setProperty("--text-dim", "#94A3B8");

      // Accents
      root.style.setProperty("--gold", "#D97706");
      root.style.setProperty("--gold-light", "#F59E0B");
      root.style.setProperty("--gold-dim", "#B45309");

      // Inputs / shadow
      root.style.setProperty("--input-bg", "rgba(15,23,42,0.03)");
      root.style.setProperty("--shadow", "0 8px 32px rgba(15,23,42,0.08)");

      document.body.style.background = "var(--bg-primary)";
      document.body.style.color = "var(--text-primary)";
    } else {
      root.classList.remove("light");
      root.classList.add("dark");

      root.style.setProperty("--bg-primary", "#080B12");
      root.style.setProperty("--bg-surface", "#0C0F1A");
      root.style.setProperty("--bg-surface-alt", "#111827");
      root.style.setProperty("--bg-card", "rgba(255,255,255,0.03)");
      root.style.setProperty("--bg-card-hover", "rgba(255,255,255,0.06)");
      root.style.setProperty("--navbar-bg", "rgba(8,11,18,0.9)");

      root.style.setProperty("--border", "rgba(255,255,255,0.06)");
      root.style.setProperty("--border-hover", "rgba(255,255,255,0.12)");

      root.style.setProperty("--text-primary", "#F1F5F9");
      root.style.setProperty("--text-secondary", "#94A3B8");
      root.style.setProperty("--text-muted", "#64748B");
      root.style.setProperty("--text-dim", "#475569");

      root.style.setProperty("--gold", "#F59E0B");
      root.style.setProperty("--gold-light", "#FCD34D");
      root.style.setProperty("--gold-dim", "#92610A");

      root.style.setProperty("--input-bg", "rgba(255,255,255,0.04)");
      root.style.setProperty("--shadow", "0 8px 32px rgba(0,0,0,0.4)");

      document.body.style.background = "var(--bg-primary)";
      document.body.style.color = "var(--text-primary)";
    }
  }, [theme]);

  return <>{children}</>;
}