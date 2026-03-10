"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useAppStore } from "@/store/useAppStore";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/convert": "Convert",
  "/wallets": "Wallets",
  "/invest": "Invest",
  "/send": "Send Money",
  "/receive": "Receive",
  "/rates": "Live Rates",
};

type RateStatus = "live" | "delayed" | "offline" | "loading";

const STATUS_CONFIG: Record<RateStatus, { color: string; label: string }> = {
  live:    { color: "var(--green)", label: "Live" },
  delayed: { color: "var(--gold)",  label: "Delayed" },
  offline: { color: "var(--red)",   label: "Offline" },
  loading: { color: "var(--text-muted)", label: "..." },
};

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAppStore();
  const [status, setStatus] = useState<RateStatus>("loading");
  const [search, setSearch] = useState("");

  const title = PAGE_TITLES[pathname] ?? "Vaultera";
  const firstName = user?.name?.split(" ")[0] ?? "there";

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/rates/status");
        const data = await res.json();
        setStatus(data.status as RateStatus);
      } catch {
        setStatus("offline");
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const { color, label } = STATUS_CONFIG[status];

  return (
    <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b sticky top-0 z-30"
      style={{
        background: "var(--navbar-bg)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}>

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button onClick={onMenuClick}
          className="md:hidden w-9 h-9 rounded-xl border flex items-center justify-center"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          <Menu size={18} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-black"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
            {title}
          </h1>
          <p className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>
            Welcome Back, {firstName} 👋
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Search — desktop only */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }} />
          <input placeholder="Search..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="vt-input pl-9 pr-4 py-2 text-sm w-48 rounded-xl"
            style={{ borderRadius: "0.75rem" }} />
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-bold"
          style={{
            background: `color-mix(in srgb, ${color} 10%, transparent)`,
            borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
            color,
          }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: color }} />
            <span className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: color }} />
          </span>
          <span className="hidden sm:inline">{label}</span>
        </div>

        {/* Theme toggle */}
        <button onClick={toggleTheme}
          className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl border flex items-center justify-center"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--gold)" }} />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black cursor-pointer"
          style={{
            background: "color-mix(in srgb, var(--gold) 20%, transparent)",
            color: "var(--gold)",
            border: "1px solid color-mix(in srgb, var(--gold) 30%, transparent)",
          }}>
          {firstName[0]}
        </div>
      </div>
    </div>
  );
}
