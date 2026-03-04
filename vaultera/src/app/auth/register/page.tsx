"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";

const PERKS = ["Free multi-currency wallet", "Live rates for 180 currencies", "Invest in USD, EUR & GBP", "Send & receive globally"];

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ background: "var(--bg-primary)" }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }} />
      </div>

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left — perks */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }} className="hidden lg:block">
          <div className="text-4xl font-black mb-3 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Join the era.
          </div>
          <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
            Thousands of people already manage their cross-currency life on Vaultera. Your turn.
          </p>
          <div className="space-y-4">
            {PERKS.map((perk, i) => (
              <motion.div key={perk} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-amber-400" />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{perk}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-t-3xl" />
          <div className="rounded-3xl border p-8 backdrop-blur-xl"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

            <div className="text-center mb-8">
              <Link href="/">
                <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}>Vaultera</div>
              </Link>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Create your free account. No credit card needed.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}>Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Adaeze Okonkwo"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-amber-500/50 transition-all"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
                </div>
              </div>

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
                  <input type={show ? "text" : "password"} placeholder="Min. 8 characters"
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

              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                By signing up you agree to our{" "}
                <a href="#" className="text-amber-400 hover:underline">Terms</a> and{" "}
                <a href="#" className="text-amber-400 hover:underline">Privacy Policy</a>.
              </p>

              <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(245,158,11,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black rounded-xl flex items-center justify-center gap-2">
                Create Free Account <ArrowRight size={16} />
              </motion.button>
            </div>

            <div className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}