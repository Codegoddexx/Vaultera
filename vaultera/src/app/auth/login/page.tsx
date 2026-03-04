"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ background: "var(--bg-primary)" }}>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md">

        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-t-3xl" />

        <div className="rounded-3xl border p-8 backdrop-blur-xl"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}>Vaultera</div>
            </Link>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Welcome back. Sign in to your account.</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" placeholder="you@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-amber-500/50 transition-all"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type={show ? "text" : "password"} placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:border-amber-500/50 transition-all"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
                <button onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Remember me</span>
              </label>
              <a href="#" className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(245,158,11,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black rounded-xl flex items-center justify-center gap-2 mt-2">
              Sign In <ArrowRight size={16} />
            </motion.button>
          </div>

          <div className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              Create one free
            </Link>
          </div>
        </div>

        {/* Demo note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-4 text-center">
          <Link href="/dashboard">
            <span className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors cursor-pointer underline underline-offset-2">
              Skip login → View demo dashboard
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}