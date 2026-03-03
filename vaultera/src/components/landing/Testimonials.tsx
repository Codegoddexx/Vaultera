"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Chisom A.", role: "Freelancer, Lagos",
    flag: "🇳🇬", avatar: "C",
    text: "I receive payments in USD and EUR from clients worldwide. Vaultera lets me hold both and convert to Naira whenever the rate is good. Game changer!",
    color: "#F59E0B",
  },
  {
    name: "Fatima Al-R.", role: "Business Owner, Dubai",
    flag: "🇦🇪", avatar: "F",
    text: "I needed to send Euros to my supplier in Germany from my AED account. No other platform made this simple. Vaultera did it in seconds.",
    color: "#8B5CF6",
  },
  {
    name: "David O.", role: "Student, London",
    flag: "🇬🇧", avatar: "D",
    text: "My mum sends me Naira, I convert to GBP. The rates are always better than my bank and it's instant. I tell every Nigerian student about Vaultera.",
    color: "#10B981",
  },
  {
    name: "Amara K.", role: "Entrepreneur, Accra",
    flag: "🇬🇭", avatar: "A",
    text: "The investment plans in USD are brilliant. I'm earning in dollars while living in Ghana. This is the future of African finance.",
    color: "#3B82F6",
  },
  {
    name: "Tobi F.", role: "Tech Professional, Lagos",
    flag: "🇳🇬", avatar: "T",
    text: "Converting EUR to USD used to require two transactions and two days. Vaultera does it in one click. I wish I found this sooner.",
    color: "#EC4899",
  },
  {
    name: "Nadia M.", role: "Trader, Cairo",
    flag: "🇪🇬", avatar: "N",
    text: "The live rates table is the best I've seen anywhere. I use it every morning before making any currency decisions. Absolutely essential.",
    color: "#F97316",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
            <span className="text-xs font-semibold text-pink-400 tracking-wider uppercase">Real People. Real Stories.</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Loved across{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              continents
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From Lagos to London to Dubai — Vaultera is changing how people move and grow their money.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}60, transparent)` }} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-sm"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {t.name} <span>{t.flag}</span>
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
