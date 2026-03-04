"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080B12]/90 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <motion.div whileHover={{ scale: 1.02 }}>
            <div className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Vaultera
            </div>
            <div className="text-[8px] tracking-[3px] text-slate-500 uppercase -mt-0.5 hidden sm:block">
              Global Currency
            </div>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l, i) => (
            <motion.a key={l.label} href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-sm text-slate-400 hover:text-white transition-colors relative group whitespace-nowrap">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            <span className="text-xs font-semibold">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </motion.button>

          <Link href="/auth/login">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all whitespace-nowrap">
              Sign In
            </motion.button>
          </Link>
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-5 py-2.5 rounded-xl whitespace-nowrap">
              Get Started
            </motion.button>
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme toggle — mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0C0F1A] border-t border-white/5 overflow-hidden">
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-white text-sm py-1.5 border-b border-white/5 last:border-0">
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <button className="w-full border border-white/10 text-white font-semibold py-3 rounded-xl text-sm hover:bg-white/5 transition-all">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-3 rounded-xl text-sm">
                    Get Started Free
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}