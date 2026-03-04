"use client";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useAppStore } from "@/store/useAppStore";

export default function TopBar() {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAppStore();

  return (
    <header className="h-16 border-b border-white/5 bg-[#080B12]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          placeholder="Search currencies, transactions..."
          className="bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500/30 w-64 md:w-72 transition-all"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-semibold">Live Rates</span>
        </div>

        {/* Theme toggle — prominent */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer
            border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span className="text-xs font-semibold hidden sm:block">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black text-sm font-black cursor-pointer">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}