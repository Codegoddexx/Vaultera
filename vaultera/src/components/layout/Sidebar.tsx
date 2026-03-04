
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ArrowLeftRight, Wallet, TrendingUp,
  Send, Download, BarChart2, ChevronLeft, ChevronRight,
  LogOut, Shield,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/convert", icon: ArrowLeftRight, label: "Convert" },
  { href: "/wallets", icon: Wallet, label: "Wallets" },
  { href: "/invest", icon: TrendingUp, label: "Invest" },
  { href: "/send", icon: Send, label: "Send" },
  { href: "/receive", icon: Download, label: "Receive" },
  { href: "/rates", icon: BarChart2, label: "Rates" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAppStore();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed left-0 top-0 h-full z-40 flex flex-col border-r"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b shrink-0"
        style={{ borderColor: "var(--border)" }}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-lg font-black gold-text" style={{ fontFamily: "var(--font-playfair)" }}>
                Vaultera
              </div>
              <div className="text-[8px] tracking-[3px] uppercase" style={{ color: "var(--text-muted)" }}>
                Global Currency
              </div>
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-lg font-black gold-text w-full text-center"
              style={{ fontFamily: "var(--font-playfair)" }}>V</motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 3 }}
                className="relative flex items-center gap-3 mx-2 mb-1 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                style={{
                  background: active ? "color-mix(in srgb, var(--gold) 12%, transparent)" : "transparent",
                  color: active ? "var(--gold)" : "var(--text-muted)",
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"; }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}}
              >
                {active && (
                  <motion.div layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                    style={{ background: "var(--gold)" }} />
                )}
                <item.icon size={18} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }} className="text-sm font-medium overflow-hidden whitespace-nowrap">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User + collapse */}
      <div className="border-t p-3 space-y-2 shrink-0" style={{ borderColor: "var(--border)" }}>
        {/* User */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl"
          style={{ background: "var(--bg-card)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black text-xs font-black shrink-0"
            style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))" }}>
            {user.name.charAt(0)}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="min-w-0 flex-1">
                <div className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>
                  {user.name.split(" ")[0]}
                </div>
                <div className="flex items-center gap-1">
                  <Shield size={9} style={{ color: "var(--green)" }} />
                  <span className="text-[9px] font-semibold" style={{ color: "var(--green)" }}>KYC Verified</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <Link href="/auth/login">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer transition-all"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--red)"; (e.currentTarget as HTMLElement).style.background = "color-mix(in srgb, var(--red) 8%, transparent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <LogOut size={16} className="shrink-0" />
            {!collapsed && <span className="text-xs font-medium">Sign Out</span>}
          </div>
        </Link>

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-xl transition-all"
          style={{ color: "var(--text-muted)", background: "var(--bg-card)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}