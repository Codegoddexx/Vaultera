"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Copy, ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useAppStore } from "@/store/useAppStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getCurrencyFlag, getCurrencySymbol } from "@/lib/formatters";
import Link from "next/link";

export default function WalletsPage() {
  const { wallets } = useWallet();
  const { transactions } = useAppStore();
  const [selected, setSelected] = useState(wallets[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const wallet = wallets.find(w => w.id === selected);
  const walletTxs = transactions.filter(t => t.currency === wallet?.currency).slice(0, 8);

  const copyAccount = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Wallet list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Wallets</h2>
          <button className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl gold-btn">
            <Plus size={12} /> Add
          </button>
        </div>
        {wallets.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(w.id)}
            whileHover={{ x: 3 }}
            className="flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all"
            style={{
              background: selected === w.id ? "color-mix(in srgb, var(--gold) 10%, var(--bg-surface))" : "var(--bg-card)",
              borderColor: selected === w.id ? "color-mix(in srgb, var(--gold) 30%, transparent)" : "var(--border)",
            }}>
            <span className="text-2xl">{getCurrencyFlag(w.currency)}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase" style={{ color: "var(--text-muted)" }}>{w.currency}</div>
              <div className="text-base font-black truncate" style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
                {formatCurrency(w.balance, w.currency)}
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
              style={{ background: `color-mix(in srgb, ${w.color} 20%, transparent)`, color: w.color }}>
              {getCurrencySymbol(w.currency)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Wallet detail */}
      <div className="lg:col-span-2 space-y-5">
        {wallet && (
          <>
            <motion.div key={wallet.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 border relative overflow-hidden"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${wallet.color}80, transparent)` }} />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getCurrencyFlag(wallet.currency)}</span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{wallet.currency} Wallet</div>
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{wallet.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
                    {formatCurrency(wallet.balance, wallet.currency)}
                  </div>
                </div>
              </div>
              {/* Account number */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>Account Number</div>
                  <div className="text-sm font-bold tracking-widest" style={{ color: "var(--text-primary)" }}>{wallet.accountNumber}</div>
                </div>
                <button onClick={copyAccount}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  style={{ color: copied ? "var(--green)" : "var(--gold)", background: copied ? "color-mix(in srgb, var(--green) 10%, transparent)" : "color-mix(in srgb, var(--gold) 10%, transparent)" }}>
                  <Copy size={12} /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              {/* Actions */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Send", icon: ArrowUpRight, href: "/send", color: "var(--blue)" },
                  { label: "Receive", icon: ArrowDownLeft, href: "/receive", color: "var(--green)" },
                  { label: "Convert", icon: ArrowLeftRight, href: "/convert", color: "var(--gold)" },
                ].map(a => (
                  <Link key={a.label} href={a.href}>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border cursor-pointer"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                      <a.icon size={16} style={{ color: a.color }} />
                      <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{a.label}</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Transactions */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Transaction History</h3>
              </div>
              {walletTxs.length === 0 ? (
                <div className="px-5 py-10 text-center" style={{ color: "var(--text-muted)" }}>No transactions yet</div>
              ) : (
                walletTxs.map((tx, i) => (
                  <div key={tx.id} className="flex items-center gap-4 px-5 py-4 border-b last:border-0"
                    style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: tx.type === "credit" ? "color-mix(in srgb, var(--green) 12%, transparent)" : "color-mix(in srgb, var(--red) 12%, transparent)" }}>
                      {tx.type === "credit"
                        ? <ArrowDownLeft size={14} style={{ color: "var(--green)" }} />
                        : <ArrowUpRight size={14} style={{ color: "var(--red)" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{tx.description}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(tx.date)}</div>
                    </div>
                    <div className="text-sm font-bold"
                      style={{ color: tx.type === "credit" ? "var(--green)" : "var(--red)" }}>
                      {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount, tx.currency)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}