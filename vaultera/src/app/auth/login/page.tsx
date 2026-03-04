"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const ok = signIn(form.email, form.password);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Try adaeze@vaultera.com / vaultera123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}>

      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, var(--gold), transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, var(--purple), transparent)" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }} className="relative w-full max-w-md">

        <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

        <div className="rounded-3xl border p-8"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <div className="text-3xl font-black gold-text mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}>Vaultera</div>
            </Link>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Welcome back. Sign in to your account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 px-4 py-3 rounded-xl text-sm border"
              style={{ background: "color-mix(in srgb, var(--red) 10%, transparent)", borderColor: "color-mix(in srgb, var(--red) 30%, transparent)", color: "var(--red)" }}>
              {error}
            </motion.div>
          )}

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }} />
                <input type="email" placeholder="adaeze@vaultera.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="vt-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                  style={{ borderRadius: "0.75rem" }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }} />
                <input type={show ? "text" : "password"} placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="vt-input w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                  style={{ borderRadius: "0.75rem" }} />
                <button onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Remember me</span>
              </label>
              <a href="#" className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
                Forgot password?
              </a>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="gold-btn w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-black"
              style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </motion.button>
          </div>

          <div className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No account?{" "}
            <Link href="/auth/register" className="font-semibold" style={{ color: "var(--gold)" }}>
              Create one free
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <p className="mt-4 text-center text-xs" style={{ color: "var(--text-dim)" }}>
          Demo: adaeze@vaultera.com / vaultera123
        </p>
      </motion.div>
    </div>
  );
}