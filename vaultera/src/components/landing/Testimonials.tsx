"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Chisom A.", role: "Freelancer, Lagos", flag: "🇳🇬", avatar: "C", text: "I receive payments in USD and EUR from clients worldwide. Vaultera lets me hold both and convert to Naira whenever the rate is good. Game changer!", color: "#F59E0B" },
  { name: "Fatima Al-R.", role: "Business Owner, Dubai", flag: "🇦🇪", avatar: "F", text: "I needed to send Euros to my supplier in Germany from my AED account. No other platform made this simple. Vaultera did it in seconds.", color: "#8B5CF6" },
  { name: "David O.", role: "Student, London", flag: "🇬🇧", avatar: "D", text: "My mum sends me Naira, I convert to GBP. The rates are always better than my bank and it's instant. I tell every Nigerian student about Vaultera.", color: "#10B981" },
  { name: "Amara K.", role: "Entrepreneur, Accra", flag: "🇬🇭", avatar: "A", text: "The investment plans in USD are brilliant. I'm earning in dollars while living in Ghana. This is the future of African finance.", color: "#3B82F6" },
  { name: "Tobi F.", role: "Tech Professional, Lagos", flag: "🇳🇬", avatar: "T", text: "Converting EUR to USD used to require two transactions and two days. Vaultera does it in one click. I wish I found this sooner.", color: "#EC4899" },
  { name: "Nadia M.", role: "Trader, Cairo", flag: "🇪🇬", avatar: "N", text: "The live rates table is the best I've seen anywhere. I use it every morning before making any currency decisions. Absolutely essential.", color: "#F97316" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="w-full py-32 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-primary)" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
          style={{ background: "color-mix(in srgb, #EC4899 10%, transparent)", borderColor: "color-mix(in srgb, #EC4899 30%, transparent)" }}>
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#EC4899" }}>Real People. Real Stories.</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
          Loved across{" "}
          <span style={{ background: "linear-gradient(135deg, #EC4899, #F43F5E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            continents
          </span>
        </h2>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          From Lagos to London to Dubai — Vaultera is changing how people move and grow their money.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-2xl border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${t.color}40`}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--text-secondary)" }}>
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-sm"
                style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}>{t.avatar}</div>
              <div>
                <div className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  {t.name} <span>{t.flag}</span>
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}