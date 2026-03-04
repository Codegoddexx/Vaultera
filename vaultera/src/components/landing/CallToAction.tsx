"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CallToAction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-surface)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden w-full"
        style={{ border: "1px solid color-mix(in srgb, var(--gold) 25%, transparent)" }}>
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--gold) 12%, transparent), color-mix(in srgb, var(--purple) 8%, transparent))"
        }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--gold) 25%, transparent)" }} />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--purple) 25%, transparent)" }} />

        <div className="relative z-10 text-center py-24 px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ background: "color-mix(in srgb, var(--gold) 15%, transparent)", borderColor: "color-mix(in srgb, var(--gold) 35%, transparent)" }}>
            <Zap size={12} style={{ color: "var(--gold)" }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--gold)" }}>
              Start in 2 minutes
            </span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
            Your era of{" "}
            <span className="gold-text">effortless</span>
            <br />money starts now.
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
            Join thousands of people who have unlocked the freedom to move, hold and grow money in any currency.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="gold-btn flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-black">
                Create Free Account <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-2xl text-base font-semibold border transition-all"
                style={{ borderColor: "var(--border-hover)", color: "var(--text-primary)", background: "var(--bg-card)" }}>
                View Demo Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}