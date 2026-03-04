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
          ? "backdrop-blur-xl border-b vt-border py-3"
          : "bg-transparent py-5"
      }`}
      style={scrolled ? { background: "var(--navbar-bg)" } : {}}
    >
      <div className="mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <motion.div whileHover={{ scale: 1.02 }}>
            <div
              className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vaultera
            </div>
            <div className="text-[8px] tracking-[3px] vt-text-m uppercase -mt-0.5 hidden sm:block">
              Global Currency
            </div>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-sm vt-text-2 hover:vt-text transition-colors relative group whitespace-nowrap"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border vt-border bg-[var(--bg-card)] vt-text transition-all duration-300"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            <span className="text-xs font-semibold">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </motion.button>

          <Link href="/auth/login">
            <button className="text-sm vt-text-2 hover:vt-text px-4 py-2 rounded-xl hover:bg-[var(--bg-card-hover)] transition-all">
              Sign In
            </button>
          </Link>

          <Link href="/auth/register">
            <button className="text-sm font-bold gold-btn px-5 py-2.5 rounded-xl">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border vt-border bg-[var(--bg-card)] vt-text"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="vt-text-2 hover:vt-text p-2 rounded-xl hover:bg-[var(--bg-card-hover)] transition-all"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden vt-surface border-t vt-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="vt-text-2 hover:vt-text text-sm py-1.5 border-b vt-border last:border-0"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}