"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import PageLoader from "@/components/layout/PageLoader";

const PERKS = [
  "Free multi-currency wallet",
  "Live rates for 180 currencies",
  "Invest in USD, EUR & GBP",
  "Send & receive globally",
];

export default function RegisterPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    router.push("/dashboard");
  };

  return (
    <>
      <PageLoader show={loading} />

      <div className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ background: "var(--bg-primary)" }}>

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, var(--gold), transparent)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, var(--blue), transparent)" }} />
        </div>

        <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left perks */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} className="hidden lg:block">
            <div className="text-4xl font-black mb-3 gold-text"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Join the era.
            </div>
            <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
              Thousands of people already manage their cross-currency life on Vaultera.
            </p>
            <div className="space-y-4">
              {PERKS.map((perk, i) => (
                <motion.div key={perk}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "color-mix(in srgb, var(--gold) 20%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--gold) 40%, transparent)",
                    }}>
                    <Check size={12} style={{ color: "var(--gold)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{perk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} className="relative">
            <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
            <div className="rounded-3xl border p-8"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

              <div className="text-center mb-8">
                <Link href="/">
                  <div className="text-3xl font-black gold-text mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}>Vaultera</div>
                </Link>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Create your free account. No credit card needed.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Full Name", type: "text", placeholder: "Adachi Okonkwo", field: "name", icon: User },
                  { label: "Email", type: "email", placeholder: "you@email.com", field: "email", icon: Mail },
                ].map(f => (
                  <div key={f.field}>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "var(--text-muted)" }}>{f.label}</label>
                    <div className="relative">
                      <f.icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--text-muted)" }} />
                      <input type={f.type} placeholder={f.placeholder}
                        value={form[f.field as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.field]: e.target.value })}
                        className="vt-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                        style={{ borderRadius: "0.75rem" }} />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "var(--text-muted)" }}>Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }} />
                    <input type={show ? "text" : "password"} placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      className="vt-input w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                      style={{ borderRadius: "0.75rem" }} />
                    <button onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}>
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  By signing up you agree to our{" "}
                  <a href="#" style={{ color: "var(--gold)" }}>Terms</a> and{" "}
                  <a href="#" style={{ color: "var(--gold)" }}>Privacy Policy</a>.
                </p>

                <motion.button
                  onClick={handleRegister}
                  disabled={!form.name || !form.email || !form.password || loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="gold-btn w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-black"
                  style={{ opacity: !form.name || !form.email || !form.password ? 0.5 : 1 }}>
                  Create Free Account <ArrowRight size={16} />
                </motion.button>
              </div>

              <div className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold" style={{ color: "var(--gold)" }}>
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
