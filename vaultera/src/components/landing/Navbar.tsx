"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Rates", href: "#rates" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--navbar-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">

          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-black gold-text"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Vaultera
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link href="/auth/login">
              <button className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "transparent" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}>
                Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="gold-btn px-4 py-2 rounded-xl text-sm font-bold">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile right — theme + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border flex items-center justify-center"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-xl border flex items-center justify-center"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden bg-black/50"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border)" }}>

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b"
                style={{ borderColor: "var(--border)" }}>
                <span className="text-xl font-black gold-text"
                  style={{ fontFamily: "var(--font-playfair)" }}>Vaultera</span>
                <button onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-xl border flex items-center justify-center"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-4 pt-6 gap-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label} href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }}>
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Auth buttons — the missing piece! */}
              <div className="px-4 pb-8 space-y-3 border-t pt-6"
                style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-bold uppercase tracking-widest px-1 mb-4"
                  style={{ color: "var(--text-muted)" }}>Account</p>

                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <button className="w-full py-3 rounded-xl text-sm font-bold border transition-all"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                      background: "var(--bg-card)",
                    }}>
                    Sign In
                  </button>
                </Link>

                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  <button className="gold-btn w-full py-3 rounded-xl text-sm font-bold">
                    Get Started — It's Free
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
