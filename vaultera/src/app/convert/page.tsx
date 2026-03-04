"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { useConverter } from "@/hooks/useConverter";
import { ALL_CURRENCIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { getCurrencyFlag } from "@/lib/formatters";

export default function ConvertPage() {
  const { fromCurrency, toCurrency, amount, result, rate, setFromCurrency, setToCurrency, setAmount, handleConvert, handleSwap } = useConverter();
  const [loading, setLoading] = useState(false);

  const onConvert = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    handleConvert();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="rounded-2xl border p-6 space-y-5"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

        <h2 className="text-lg font-black" style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
          Currency Converter
        </h2>

        {/* Amount */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Amount</label>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
            className="vt-input w-full px-4 py-3 rounded-xl text-2xl font-black"
            style={{ borderRadius: "0.75rem", fontFamily: "var(--font-playfair)" }} />
        </div>

        {/* From / Swap / To */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>From</label>
            <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}
              className="vt-input w-full px-4 py-3 rounded-xl text-sm font-semibold"
              style={{ borderRadius: "0.75rem" }}>
              {ALL_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{getCurrencyFlag(c.code)} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>

          <motion.button onClick={handleSwap} whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-3 rounded-xl border shrink-0"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--gold)" }}>
            <ArrowLeftRight size={18} />
          </motion.button>

          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>To</label>
            <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}
              className="vt-input w-full px-4 py-3 rounded-xl text-sm font-semibold"
              style={{ borderRadius: "0.75rem" }}>
              {ALL_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{getCurrencyFlag(c.code)} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert button */}
        <motion.button onClick={onConvert} disabled={loading}
          whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
          className="gold-btn w-full py-4 rounded-xl text-base font-black flex items-center justify-center gap-2">
          {loading ? <><RefreshCw size={18} className="animate-spin" /> Converting...</> : <>Convert {getCurrencyFlag(fromCurrency)} → {getCurrencyFlag(toCurrency)}</>}
        </motion.button>

        {/* Result */}
        {result !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 text-center border"
            style={{ background: "color-mix(in srgb, var(--gold) 8%, transparent)", borderColor: "color-mix(in srgb, var(--gold) 25%, transparent)" }}>
            <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
              {formatCurrency(amount, fromCurrency)} equals
            </p>
            <p className="text-4xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)" }}>
              {formatCurrency(result, toCurrency)}
            </p>
            <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              1 {fromCurrency} = {rate?.toFixed(4)} {toCurrency} · Live rate
            </p>
          </motion.div>
        )}
      </div>

      {/* Popular pairs */}
      <div className="rounded-2xl border p-5" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-muted)" }}>Popular Pairs</h3>
        <div className="grid grid-cols-2 gap-3">
          {[["EUR","USD"],["USD","NGN"],["GBP","USD"],["EUR","GBP"],["USD","AED"],["GBP","NGN"]].map(([f,t]) => (
            <motion.button key={`${f}-${t}`} whileHover={{ scale: 1.02 }}
              onClick={() => { setFromCurrency(f); setToCurrency(t); }}
              className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--gold) 40%, transparent)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}>
              <span>{getCurrencyFlag(f)} {f}</span>
              <ArrowLeftRight size={12} style={{ color: "var(--text-muted)" }} />
              <span>{getCurrencyFlag(t)} {t}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}