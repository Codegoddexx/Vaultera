"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Share2, CheckCircle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { getCurrencyFlag } from "@/lib/formatters";
import { formatCurrency } from "@/lib/utils";

export default function ReceivePage() {
  const { wallets } = useWallet();
  const [selected, setSelected] = useState(wallets[0]?.id ?? "");
  const [copied, setCopied] = useState<string | null>(null);

  const wallet = wallets.find(w => w.id === selected);

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-lg mx-auto space-y-5">
      {/* Wallet selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Select Wallet to Receive Into
        </label>
        <div className="flex gap-2 flex-wrap">
          {wallets.map(w => (
            <button key={w.id} onClick={() => setSelected(w.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all"
              style={{
                background: selected === w.id ? "color-mix(in srgb, var(--gold) 15%, transparent)" : "var(--bg-card)",
                borderColor: selected === w.id ? "color-mix(in srgb, var(--gold) 40%, transparent)" : "var(--border)",
                color: selected === w.id ? "var(--gold)" : "var(--text-secondary)",
              }}>
              {getCurrencyFlag(w.currency)} {w.currency}
            </button>
          ))}
        </div>
      </div>

      {wallet && (
        <motion.div key={wallet.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border p-6 space-y-5"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, var(--gold), transparent)` }} />

          {/* Balance */}
          <div className="text-center py-4">
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Current Balance</p>
            <p className="text-4xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
              {formatCurrency(wallet.balance, wallet.currency)}
            </p>
          </div>

          {/* QR placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2"
              style={{ borderColor: "color-mix(in srgb, var(--gold) 40%, transparent)", background: "color-mix(in srgb, var(--gold) 5%, transparent)" }}>
              <div className="grid grid-cols-5 gap-0.5">
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i} className="w-5 h-5 rounded-sm"
                    style={{ background: Math.random() > 0.5 ? "var(--gold)" : "transparent" }} />
                ))}
              </div>
              <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>Scan QR Code</p>
            </div>
          </div>

          {/* Details */}
          {[
            { label: "Account Number", value: wallet.accountNumber },
            { label: "Currency", value: `${getCurrencyFlag(wallet.currency)} ${wallet.currency} — ${wallet.name}` },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{item.value}</div>
              </div>
              <button onClick={() => copy(item.value, item.label)}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ color: copied === item.label ? "var(--green)" : "var(--gold)", background: "color-mix(in srgb, var(--gold) 10%, transparent)" }}>
                {copied === item.label ? <CheckCircle size={12} /> : <Copy size={12} />}
                {copied === item.label ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}

          {/* Share */}
          <button className="gold-btn w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <Share2 size={16} /> Share Payment Details
          </button>
        </motion.div>
      )}
    </div>
  );
}