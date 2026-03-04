"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, ArrowRight, CheckCircle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { formatCurrency } from "@/lib/utils";
import { getCurrencyFlag } from "@/lib/formatters";

export default function SendPage() {
  const { wallets } = useWallet();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ wallet: wallets[0]?.id ?? "", recipient: "", amount: "", note: "" });
  const [loading, setLoading] = useState(false);

  const selectedWallet = wallets.find(w => w.id === form.wallet);

  const handleSend = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setStep(3);
    setLoading(false);
  };

  if (step === 3) return (
    <div className="max-w-md mx-auto text-center py-20">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        <CheckCircle size={64} className="mx-auto mb-6" style={{ color: "var(--green)" }} />
      </motion.div>
      <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
        Sent Successfully!
      </h2>
      <p className="mb-6" style={{ color: "var(--text-muted)" }}>
        {formatCurrency(Number(form.amount), selectedWallet?.currency ?? "USD")} sent to {form.recipient}
      </p>
      <button onClick={() => { setStep(1); setForm({ ...form, recipient: "", amount: "", note: "" }); }}
        className="gold-btn px-8 py-3 rounded-xl font-bold">
        Send Another
      </button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="rounded-2xl border p-6 space-y-5"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        <h2 className="text-lg font-black" style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
          Send Money
        </h2>

        {/* Wallet select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>From Wallet</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {wallets.map(w => (
              <button key={w.id} onClick={() => setForm({ ...form, wallet: w.id })}
                className="flex items-center gap-2 p-3 rounded-xl border text-left transition-all"
                style={{
                  background: form.wallet === w.id ? "color-mix(in srgb, var(--gold) 12%, transparent)" : "var(--bg-card)",
                  borderColor: form.wallet === w.id ? "color-mix(in srgb, var(--gold) 40%, transparent)" : "var(--border)",
                }}>
                <span>{getCurrencyFlag(w.currency)}</span>
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{w.currency}</div>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{formatCurrency(w.balance, w.currency)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipient */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Recipient Account / Email</label>
          <div className="relative">
            <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input placeholder="account number or email" value={form.recipient}
              onChange={e => setForm({ ...form, recipient: e.target.value })}
              className="vt-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" style={{ borderRadius: "0.75rem" }} />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
            Amount ({selectedWallet?.currency})
          </label>
          <input type="number" placeholder="0.00" value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            className="vt-input w-full px-4 py-3 rounded-xl text-2xl font-black"
            style={{ borderRadius: "0.75rem", fontFamily: "var(--font-playfair)" }} />
          {selectedWallet && (
            <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
              Available: {formatCurrency(selectedWallet.balance, selectedWallet.currency)}
            </p>
          )}
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Note (optional)</label>
          <input placeholder="What's this for?" value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            className="vt-input w-full px-4 py-3 rounded-xl text-sm" style={{ borderRadius: "0.75rem" }} />
        </div>

        <motion.button onClick={handleSend} disabled={!form.recipient || !form.amount || loading}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="gold-btn w-full py-4 rounded-xl font-black flex items-center justify-center gap-2"
          style={{ opacity: !form.recipient || !form.amount ? 0.5 : 1 }}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <><Send size={18} /> Send {form.amount && selectedWallet ? formatCurrency(Number(form.amount), selectedWallet.currency) : "Money"}</>
          )}
        </motion.button>
      </div>
    </div>
  );
}