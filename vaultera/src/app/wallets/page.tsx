"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Copy, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, CheckCircle } from "lucide-react";
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
  const walletTxs = transactions
    .filter(t => t.currency === wallet?.currency)
    .slice(0, 8);

  const copyAccount = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">

      {/* Wallet list */}
      <div className="lg:col-span-1 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}>My Wallets</h2>
          <button className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl gold-btn">
            <Plus size={12} /> Add
          </button>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-x-visible">
          {wallets.map((w, i) => (
            <motion.div key={w.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(w.id)}
              className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl border cursor-pointer transition-all shrink-0 lg:shrink"
              style={{
                minWidth: "160px",
                background: selected === w.id
                  ? "color-mix(in srgb, var(--gold) 10%, var(--bg-surface))"
                  : "var(--bg-card)",
                borderColor: selected === w.id
                  ? "color-mix(in srgb, var(--gold) 30%, transparent)"
                  : "var(--border)",
              }}>
              <span className="text-2xl">{getCurrencyFlag(w.currency)}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}>{w.currency}</div>
                <div className="text-sm font-black truncate"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair)" }}>
                  {formatCurrency(w.balance, w.currency)}
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
                style={{ background: `color-mix(in srgb, var(--gold) 20%, transparent)`, color: "var(--gold)" }}>
                {getCurrencySymbol(w.currency)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wallet detail */}
      <div className="lg:col-span-2 space-y-4">
        {wallet && (
          <>
            <motion.div key={wallet.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border p-5 sm:p-6 relative overflow-hidden"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>

              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--gold)80, transparent)" }} />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getCurrencyFlag(wallet.currency)}</span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}>{wallet.currency} Wallet</div>
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {wallet.currency} Account
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-2xl sm:text-3xl font-black"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
                    {formatCurrency(wallet.balance, wallet.currency)}
                  </div>
                  <div className="text-xs mt-0.5"
                    style={{ color: wallet.change >= 0 ? "var(--green)" : "var(--red)" }}>
                    {wallet.change >= 0 ? "+" : ""}{wallet.change}% today
                  </div>
                </div>
              </div>

              {/* Account number */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border mb-4"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--text-muted)" }}>Account Number</div>
                  <div className="text-sm font-bold tracking-widest truncate"
                    style={{ color: "var(--text-primary)" }}>{wallet.accountNumber}</div>
                </div>
                <button onClick={copyAccount}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ml-3 shrink-0 transition-all"
                  style={{
                    color: copied ? "var(--green)" : "var(--gold)",
                    background: copied
                      ? "color-mix(in srgb, var(--green) 10%, transparent)"
                      : "color-mix(in srgb, var(--gold) 10%, transparent)",
                  }}>
                  {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Send", icon: ArrowUpRight, href: "/send", color: "var(--blue)" },
                  { label: "Receive", icon: ArrowDownLeft, href: "/receive", color: "var(--green)" },
                  { label: "Convert", icon: ArrowLeftRight, href: "/convert", color: "var(--gold)" },
                ].map(a => (
                  <Link key={a.label} href={a.href}>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border cursor-pointer transition-all"
                      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = a.color}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}>
                      <a.icon size={16} style={{ color: a.color }} />
                      <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                        {a.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Transaction history */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="px-5 py-4 border-b"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  Transaction History
                </h3>
              </div>

              {walletTxs.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm"
                  style={{ color: "var(--text-muted)", background: "var(--bg-card)" }}>
                  No transactions yet for this wallet.
                </div>
              ) : (
                walletTxs.map((tx) => (
                  <div key={tx.id}
                    className="flex items-center gap-4 px-4 sm:px-5 py-3 sm:py-4 border-b last:border-0 transition-all"
                    style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: tx.type === "receive"
                          ? "color-mix(in srgb, var(--green) 12%, transparent)"
                          : tx.type === "convert"
                          ? "color-mix(in srgb, var(--gold) 12%, transparent)"
                          : "color-mix(in srgb, var(--red) 12%, transparent)",
                      }}>
                      {tx.type === "receive"
                        ? <ArrowDownLeft size={14} style={{ color: "var(--green)" }} />
                        : tx.type === "convert"
                        ? <ArrowLeftRight size={14} style={{ color: "var(--gold)" }} />
                        : <ArrowUpRight size={14} style={{ color: "var(--red)" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate"
                        style={{ color: "var(--text-primary)" }}>
                        {tx.note ?? tx.type}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatDate(tx.date)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold"
                        style={{
                          color: tx.type === "receive" ? "var(--green)"
                            : tx.type === "convert" ? "var(--gold)"
                            : "var(--red)",
                        }}>
                        {tx.type === "receive" ? "+" : "-"}
                        {formatCurrency(tx.amount, tx.currency)}
                      </div>
                      <div className="text-[10px] capitalize px-2 py-0.5 rounded-full mt-0.5 inline-block"
                        style={{
                          background: tx.status === "completed"
                            ? "color-mix(in srgb, var(--green) 12%, transparent)"
                            : "color-mix(in srgb, var(--gold) 12%, transparent)",
                          color: tx.status === "completed" ? "var(--green)" : "var(--gold)",
                        }}>
                        {tx.status}
                      </div>
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