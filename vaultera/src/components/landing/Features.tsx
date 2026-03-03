"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeftRight, Wallet, TrendingUp, Send, Globe, Shield, Zap, BarChart2 } from "lucide-react";

const FEATURES = [
  {
    icon: ArrowLeftRight, title: "Convert Any Currency",
    desc: "Swap between all 180 world currencies instantly at live interbank rates. Euro to Naira? Dollar to Dirham? Done.",
    color: "#F59E0B", gradient: "from-amber-500/20 to-yellow-500/5",
  },
  {
    icon: Wallet, title: "Multi-Currency Wallet",
    desc: "Hold balances in USD, EUR, GBP, NGN, AED and more. Each wallet has its own account number.",
    color: "#8B5CF6", gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: TrendingUp, title: "Invest & Earn",
    desc: "Put your USD, EUR or GBP to work. Earn returns of up to 18% p.a. directly in your chosen currency.",
    color: "#10B981", gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: Send, title: "Send Anywhere",
    desc: "Send money to anyone worldwide in seconds. Any currency, any country, any time.",
    color: "#3B82F6", gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Globe, title: "180 Currencies",
    desc: "Every currency on earth. From the Nigerian Naira to the Swiss Franc — we've got them all.",
    color: "#EC4899", gradient: "from-pink-500/20 to-pink-500/5",
  },
  {
    icon: Shield, title: "Bank-Grade Security",
    desc: "Your funds are protected with 256-bit encryption, 2FA, and full KYC verification.",
    color: "#06B6D4", gradient: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    icon: Zap, title: "Instant Execution",
    desc: "Conversions happen in milliseconds. No waiting, no delays. Speed is our promise.",
    color: "#F97316", gradient: "from-orange-500/20 to-orange-500/5",
  },
  {
    icon: BarChart2, title: "Live Rate Dashboard",
    desc: "Track all 180 currency rates in real time. Set alerts for your favourite pairs.",
    color: "#A78BFA", gradient: "from-violet-500/20 to-violet-500/5",
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-32 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Everything You Need</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Built for the{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              borderless
            </span>{" "}
            generation
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every feature designed to make cross-currency life effortless — whether you're in Lagos, London, Dubai or anywhere in between.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/10"
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Top glow line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>

                <h3 className="text-sm font-bold text-white mb-3">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
