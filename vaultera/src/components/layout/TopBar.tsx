"use client";
import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useAppStore } from "@/store/useAppStore";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/convert": "Convert Currency",
  "/wallets": "My Wallets",
  "/invest": "Investments",
  "/send": "Send Money",
  "/receive": "Receive Money",
  "/rates": "Live Rates",
};

export default function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAppStore();
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Vaultera";

  return (
    <header
      className="h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 border-b"
      style={{
        background: "var(--navbar-bg)",
        borderColor: "var(--border)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu Button */}
        {onMenuClick && (
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={onMenuClick}
            style={{ color: "var(--text-primary)" }}
          >
            <Menu size={20} />
          </button>
        )}

        {/* Page title */}
        <div>
          <h1
            className="text-base font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h1>

          <p
            className="text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            Welcome back, {user.name.split(" ")[0]} 👋
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-muted)" }}
        />
        <input
          placeholder="Search..."
          className="vt-input pl-9 pr-4 py-2 rounded-xl text-sm w-56"
          style={{ borderRadius: "0.75rem" }}
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">

        {/* Live indicator */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
          style={{
            background:
              "color-mix(in srgb, var(--green) 10%, transparent)",
            borderColor:
              "color-mix(in srgb, var(--green) 25%, transparent)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--green)" }}
          />
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--green)" }}
          >
            Live
          </span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all"
          style={{
            borderColor:
              "color-mix(in srgb, var(--gold) 40%, transparent)",
            background:
              "color-mix(in srgb, var(--gold) 8%, transparent)",
            color: "var(--gold)",
          }}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          <span className="text-xs font-semibold hidden sm:block">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl transition-all"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "var(--text-primary)")}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "var(--text-muted)")}
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--gold)" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-black text-sm font-black cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, var(--gold), var(--gold-light))",
          }}
        >
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}