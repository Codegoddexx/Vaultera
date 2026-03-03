"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Wallet, ArrowLeftRight, TrendingUp } from "lucide-react";

const STEPS = [
  {
    number: "01", icon: UserPlus, title: "Create Your Account",
    desc: "Sign up in 2 minutes. Verify your identity with KYC and unlock all features.",
    color: "#F59E0B",
  },
  {
    number: "02", icon: Wallet, title: "Add Your Currencies",
    desc: "Choose which currency wallets you want. USD, EUR, GBP, NGN, AED — all available.",
    color: "#8B5CF6",
  },
  {
    number: "03", icon: ArrowLeftRight, title: "Convert Instantly",
    desc: "Select any two currencies and convert at live rates. No hidden fees, no confusion.",
    color: "#10B981",
  },
  {
    number: "04", icon: TrendingUp, title: "Invest & Grow",
    desc: "Put your balance into investment plans and earn returns directly in USD, EUR or GBP.",
    color: "#3B82F6",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how" ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Up and running in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              minutes
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No bank visits. No paperwork. No confusion. Just four simple steps to financial freedom.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative text-center group"
              >
                {/* Number bubble */}
                <motion.div
                  whileHover={{ scale: 1.1, rotateY: 180 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                >
                  <step.icon size={24} style={{ color: step.color }} />
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center text-black"
                    style={{ background: step.color }}>
                    {i + 1}
                  </div>
                </motion.div>

                <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
