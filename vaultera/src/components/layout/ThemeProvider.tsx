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
      root.style.setProperty("--bg-primary", "#0b3008");
      root.style.setProperty("--bg-surface", "#27ce18");
      root.style.setProperty("--text-primary", "#0F172A");
      root.style.setProperty("--text-secondary", "#334155");
      root.style.setProperty("--text-muted", "#64748B");
      root.style.setProperty("--border", "rgba(0,0,0,0.08)");
      root.style.setProperty("--bg-card", "rgba(0,0,0,0.03)");
      root.style.setProperty("--gold", "#D97706");
      root.style.setProperty("--gold-light", "#F59E0B");
      document.body.style.background = "#F5EFE6";
      document.body.style.color = "#0F172A";
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.setProperty("--bg-primary", "#080B12");
      root.style.setProperty("--bg-surface", "#0C0F1A");
      root.style.setProperty("--text-primary", "#f1f1f9");
      root.style.setProperty("--text-secondary", "#94A3B8");
      root.style.setProperty("--text-muted", "#64748B");
      root.style.setProperty("--border", "rgba(255,255,255,0.06)");
      root.style.setProperty("--bg-card", "rgba(255,255,255,0.03)");
      root.style.setProperty("--gold", "#F59E0B");
      root.style.setProperty("--gold-light", "#FCD34D");
      document.body.style.background = "#080B12";
      document.body.style.color = "#F1F5F9";
    }
  }, [theme]);

  return <>{children}</>;
}