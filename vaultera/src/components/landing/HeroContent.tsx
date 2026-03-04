"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const STATS = [
  { value: "180+", label: "Currencies" },
  { value: "$2.4B", label: "Converted" },
  { value: "50K+", label: "Users" },
  { value: "0.1s", label: "Avg. Speed" },
];

export default function HeroContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-24"
      style={{ background: "var(--bg-surface)" }}>
      <div className="w-full px-6 md:px-12 lg:px-20">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-center mb-8"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
        >
          Your wealth.<br />
          <span className="relative inline-block">
            <span style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Every currency.
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full origin-left"
              style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-light))" }}
            />
          </span><br />
          One era.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          Convert between any of 180 world currencies instantly. Hold balances in{" "}
          <span style={{ color: "var(--gold)", fontWeight: 700 }}>USD, EUR & GBP</span>.
          Invest and earn returns in the currency of your choice.{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
            No borders. Just Vaultera.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px color-mix(in srgb, var(--gold) 50%, transparent)" }}
              whileTap={{ scale: 0.97 }}
              className="gold-btn px-10 py-4 rounded-2xl text-base font-black w-full sm:w-auto"
            >
              Open Free Account →
            </motion.button>
          </Link>
          <Link href="/convert">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-2xl text-base font-semibold border transition-all w-full sm:w-auto"
              style={{
                borderColor: "var(--border-hover)",
                color: "var(--text-primary)",
                background: "var(--bg-card)",
              }}
            >
              Try Converter Free
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats — full width, no max-w */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="text-center py-8 px-4 rounded-2xl border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="text-4xl font-black mb-2"
                style={{
                  fontFamily: "var(--font-playfair)",
                  background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                {stat.value}
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}