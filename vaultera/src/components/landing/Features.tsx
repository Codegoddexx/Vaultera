"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeftRight, Wallet, TrendingUp, Send, Globe, Shield, Zap, BarChart2 } from "lucide-react";

const FEATURES = [
  { icon: ArrowLeftRight, title: "Convert Any Currency", desc: "Swap between all 180 world currencies instantly at live interbank rates. Euro to Naira? Dollar to Dirham? Done.", color: "#F59E0B" },
  { icon: Wallet, title: "Multi-Currency Wallet", desc: "Hold balances in USD, EUR, GBP, NGN, AED and more. Each wallet has its own account number.", color: "#8B5CF6" },
  { icon: TrendingUp, title: "Invest & Earn", desc: "Put your USD, EUR or GBP to work. Earn returns of up to 18% p.a. directly in your chosen currency.", color: "#10B981" },
  { icon: Send, title: "Send Anywhere", desc: "Send money to anyone worldwide in seconds. Any currency, any country, any time.", color: "#3B82F6" },
  { icon: Globe, title: "180 Currencies", desc: "Every currency on earth. From the Nigerian Naira to the Swiss Franc — we have them all.", color: "#EC4899" },
  { icon: Shield, title: "Bank-Grade Security", desc: "Your funds are protected with 256-bit encryption, 2FA, and full KYC verification.", color: "#06B6D4" },
  { icon: Zap, title: "Instant Execution", desc: "Conversions happen in milliseconds. No waiting, no delays. Speed is our promise.", color: "#F97316" },
  { icon: BarChart2, title: "Live Rate Dashboard", desc: "Track all 180 currency rates in real time. Set alerts for your favourite pairs.", color: "#A78BFA" },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="w-full py-32 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-primary)" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }} className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
          style={{ background: "color-mix(in srgb, var(--gold) 10%, transparent)", borderColor: "color-mix(in srgb, var(--gold) 30%, transparent)" }}>
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--gold)" }}>
            Everything You Need
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
          Built for the{" "}
          <span className="gold-text">borderless</span>{" "}generation
        </h2>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Every feature designed to make cross-currency life effortless — whether you are in Lagos, London, Dubai or anywhere in between.
        </p>
      </motion.div>

      {/* Full width grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div key={f.title}
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative rounded-2xl border p-6 cursor-pointer"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", transition: "all 0.3s" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${f.color}40`;
              (e.currentTarget as HTMLElement).style.background = `${f.color}08`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, transparent, ${f.color}40, transparent)` }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
              <f.icon size={22} style={{ color: f.color }} />
            </div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
