"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Wallet, ArrowLeftRight, TrendingUp } from "lucide-react";

const STEPS = [
  { number: "01", icon: UserPlus, title: "Create Your Account", desc: "Sign up in 2 minutes. Verify your identity with KYC and unlock all features.", color: "#F59E0B" },
  { number: "02", icon: Wallet, title: "Add Your Currencies", desc: "Choose which currency wallets you want. USD, EUR, GBP, NGN, AED — all available.", color: "#8B5CF6" },
  { number: "03", icon: ArrowLeftRight, title: "Convert Instantly", desc: "Select any two currencies and convert at live rates. No hidden fees, no confusion.", color: "#10B981" },
  { number: "04", icon: TrendingUp, title: "Invest & Grow", desc: "Put your balance into investment plans and earn returns directly in USD, EUR or GBP.", color: "#3B82F6" },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how" ref={ref} className="w-full py-32 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-surface)" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
          style={{ background: "color-mix(in srgb, var(--purple) 10%, transparent)", borderColor: "color-mix(in srgb, var(--purple) 30%, transparent)" }}>
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--purple)" }}>Simple Process</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
          Up and running in{" "}
          <span style={{ background: "linear-gradient(135deg, var(--purple), #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            minutes
          </span>
        </h2>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          No bank visits. No paperwork. No confusion. Four simple steps to financial freedom.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step, i) => (
          <motion.div key={step.number}
            initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="relative text-center group">
            <motion.div whileHover={{ scale: 1.1 }}
              className="relative w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
              <step.icon size={24} style={{ color: step.color }} />
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center text-black"
                style={{ background: step.color }}>{i + 1}</div>
            </motion.div>
            <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}